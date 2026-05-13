import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/orders`, { headers: this.headers() });
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/my-orders`, { headers: this.headers() });
  }

  placeOrder(items: any[]): Observable<any> {
    return this.http.post(`${this.api}/orders`, { items }, { headers: this.headers() });
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.api}/orders/${id}/status`, { status }, { headers: this.headers() });
  }
}