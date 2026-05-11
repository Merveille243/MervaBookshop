import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  DxDataGridModule,
  DxButtonModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxTemplateModule
} from 'devextreme-angular';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxTemplateModule
  ],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  popupVisible = false;
  isEditing = false;
  currentBook: Book = { title: '', author: '', genre: '', price: 0, quantity: 0 };

  constructor(private bookService: BookService) {}

  ngOnInit() { this.loadBooks(); }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  openAddForm() {
    this.isEditing = false;
    this.currentBook = { title: '', author: '', genre: '', price: 0, quantity: 0 };
    this.popupVisible = true;
  }

  openEditForm(book: Book) {
    this.isEditing = true;
    this.currentBook = { ...book };
    this.popupVisible = true;
  }

 saveBook() {
  if (this.isEditing && this.currentBook.id) {
    this.bookService.updateBook(this.currentBook.id, this.currentBook)
      .subscribe({
        next: () => {
          this.loadBooks();
          this.popupVisible = false;
        },
        error: (err) => {
          console.error('Update failed', err);
          alert('Failed to update book. Check console for details.');
        }
      });
  } else {
    this.bookService.createBook(this.currentBook)
      .subscribe({
        next: () => {
          this.loadBooks();
          this.popupVisible = false;
        },
        error: (err) => {
          console.error('Create failed', err);
          alert('Failed to save book. Check console for details.');
        }
      });
  }
}

  deleteBook(id: number) {
    if (confirm('Delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }
}