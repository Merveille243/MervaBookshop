import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://127.0.0.1:8000/api';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/admin/login`, { email, password });
  }

  customerLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/customer/login`, { email, password });
  }

  customerRegister(data: any): Observable<any> {
    return this.http.post(`${this.api}/customer/register`, data);
  }

  saveSession(token: string, role: string, user: any): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  getRole(): string | null {
    return this.isBrowser ? localStorage.getItem('role') : null;
  }

  getUser(): any {
    if (!this.isBrowser) return null;
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean { return !!this.getToken(); }
  isAdmin(): boolean    { return this.getRole() === 'admin'; }
  isCustomer(): boolean { return this.getRole() === 'customer'; }
}