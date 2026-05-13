import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  DxDataGridModule, DxButtonModule,
  DxSelectBoxModule, DxTemplateModule
} from 'devextreme-angular';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    CommonModule, RouterModule, HttpClientModule,
    DxDataGridModule, DxButtonModule,
    DxSelectBoxModule, DxTemplateModule
  ],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  statusOptions = ['pending', 'confirmed', 'delivered', 'cancelled'];

  constructor(
    private orderService: OrderService,
    private auth: AuthService
  ) {}

  ngOnInit() { this.loadOrders(); }

  loadOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => { this.orders = data; this.loading = false; },
      error: ()     => { this.loading = false; }
    });
  }

  updateStatus(orderId: number, status: string) {
    this.orderService.updateStatus(orderId, status).subscribe({
      next: () => this.loadOrders(),
      error: (err) => console.error('Status update failed', err)
    });
  }

  statusColor(status: string): string {
    const map: any = {
      pending:   '#fbbf24',
      confirmed: '#60a5fa',
      delivered: '#34d399',
      cancelled: '#f87171'
    };
    return map[status] || '#ccc';
  }

  get totalRevenue() {
    return this.orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
      .toFixed(2);
  }

  get pendingCount()   { return this.orders.filter(o => o.status === 'pending').length; }
  get deliveredCount() { return this.orders.filter(o => o.status === 'delivered').length; }
}