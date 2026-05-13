import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule, RouterModule, HttpClientModule,
    DxDataGridModule, DxButtonModule, DxTemplateModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() { this.loadOrders(); }

  loadOrders() {
    this.loading = true;
    this.orderService.getMyOrders().subscribe({
      next: (data) => { this.orders = data; this.loading = false; },
      error: ()     => { this.loading = false; }
    });
  }

  get currentUser() { return this.auth.getUser(); }

  statusColor(status: string): string {
    const map: any = {
      pending:   '#fbbf24',
      confirmed: '#60a5fa',
      delivered: '#34d399',
      cancelled: '#f87171'
    };
    return map[status] || '#ccc';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}