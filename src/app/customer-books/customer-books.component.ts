import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  DxDataGridModule, DxButtonModule, DxPopupModule,
  DxNumberBoxModule, DxTemplateModule, DxScrollViewModule
} from 'devextreme-angular';
import { BookService, Book } from '../services/book.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

interface CartItem {
  book: Book;
  quantity: number;
}

@Component({
  selector: 'app-customer-books',
  standalone: true,
  imports: [
    CommonModule, RouterModule, HttpClientModule,
    DxDataGridModule, DxButtonModule, DxPopupModule,
    DxNumberBoxModule, DxTemplateModule, DxScrollViewModule
  ],
  templateUrl: './customer-books.component.html',
  styleUrl: './customer-books.component.css'
})
export class CustomerBooksComponent implements OnInit {
  books: Book[] = [];
  cart: CartItem[] = [];
  cartVisible = false;
  orderSuccess = false;
  placing = false;

  constructor(
    private bookService: BookService,
    private orderService: OrderService,
    private auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() { this.loadBooks(); }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  get currentUser() { return this.auth.getUser(); }

  get cartTotal() {
    return this.cart.reduce((sum, i) => sum + (i.book.price * i.quantity), 0).toFixed(2);
  }

  get cartCount() {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  addToCart(book: Book) {
    const existing = this.cart.find(i => i.book.id === book.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ book, quantity: 1 });
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  updateQuantity(index: number, qty: number) {
    if (qty < 1) return;
    this.cart[index].quantity = qty;
  }

  placeOrder() {
    if (this.cart.length === 0) return;
    this.placing = true;

    const items = this.cart.map(i => ({
      book_id: i.book.id,
      quantity: i.quantity
    }));

    this.orderService.placeOrder(items).subscribe({
      next: () => {
        this.orderSuccess = true;
        this.cart = [];
        this.placing = false;
      },
      error: (err) => {
        console.error('Order failed', err);
        this.placing = false;
        alert('Failed to place order. Please try again.');
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}