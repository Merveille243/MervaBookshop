import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8000/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]>           { return this.http.get<Book[]>(this.apiUrl); }
  createBook(b: Book): Observable<Book>    { return this.http.post<Book>(this.apiUrl, b); }
  updateBook(id: number, b: Book): Observable<Book> { return this.http.put<Book>(`${this.apiUrl}/${id}`, b); }
  deleteBook(id: number): Observable<any>  { return this.http.delete(`${this.apiUrl}/${id}`); }
}