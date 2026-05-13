import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Book {
  id?: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://127.0.0.1:8000/api/books';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  getBooks(): Observable<Book[]>  { return this.http.get<Book[]>(this.apiUrl); }

  createBook(b: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, b, { headers: this.headers() });
  }

  updateBook(id: number, b: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, b, { headers: this.headers() });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }
}