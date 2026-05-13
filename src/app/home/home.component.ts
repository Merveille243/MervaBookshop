import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxPopupModule,
  DxTextBoxModule,
  DxTabsModule,
  DxTemplateModule
} from 'devextreme-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule,
    DxButtonModule, DxPopupModule, DxTextBoxModule,
    DxTabsModule, DxTemplateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loginPopupVisible  = false;
  activeTab          = 0;
  errorMsg           = '';

  adminEmail    = '';
  adminPassword = '';

  customerEmail    = '';
  customerPassword = '';

  regName     = '';
  regEmail    = '';
  regPassword = '';
  regPhone    = '';

  tabs = [
    { text: 'Admin Login' },
    { text: 'Customer Login' },
    { text: 'Register' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  get isLoggedIn()  { return this.auth.isLoggedIn(); }
  get isAdmin()     { return this.auth.isAdmin(); }
  get isCustomer()  { return this.auth.isCustomer(); }
  get currentUser() { return this.auth.getUser(); }

  openLogin() {
    this.loginPopupVisible = true;
    this.errorMsg = '';
  }

  adminLogin() {
    this.auth.adminLogin(this.adminEmail, this.adminPassword).subscribe({
      next: (res) => {
        this.auth.saveSession(res.token, 'admin', res.user);
        this.loginPopupVisible = false;
        this.router.navigate(['/admin/books']);
      },
      error: () => { this.errorMsg = 'Invalid admin credentials.'; }
    });
  }

  customerLogin() {
    this.auth.customerLogin(this.customerEmail, this.customerPassword).subscribe({
      next: (res) => {
        this.auth.saveSession(res.token, 'customer', res.customer);
        this.loginPopupVisible = false;
        this.router.navigate(['/shop']);
      },
      error: () => { this.errorMsg = 'Invalid email or password.'; }
    });
  }

  register() {
    this.auth.customerRegister({
      name: this.regName, email: this.regEmail,
      password: this.regPassword, phone: this.regPhone
    }).subscribe({
      next: (res) => {
        this.auth.saveSession(res.token, 'customer', res.customer);
        this.loginPopupVisible = false;
        this.router.navigate(['/shop']);
      },
      error: () => { this.errorMsg = 'Registration failed. Email may already exist.'; }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  goToShop() { this.router.navigate(['/shop']); }
}