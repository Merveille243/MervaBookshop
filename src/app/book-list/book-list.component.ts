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
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    DxDataGridModule,
    DxPopupModule,
    DxTemplateModule,

    DxTextBoxModule,
    DxNumberBoxModule,
    DxButtonModule
  ],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  popupVisible = false;
  isEditing = false;
  currentBook: Book = { title: '', author: '', genre: '', price: 0, quantity: 0 };

constructor(
  private bookService: BookService,
  private router: Router
) {}
  ngOnInit() { this.loadBooks(); }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }
  refreshBooks() {
  this.loadBooks();
}
goHome() {
  this.router.navigate(['/']);
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

  if (this.isEditing) {

    this.bookService
      .updateBook(this.currentBook.id!, this.currentBook)
      .subscribe(() => {

        this.loadBooks();

        // Close popup
        this.popupVisible = false;

      });

  } else {

    this.bookService
      .createBook(this.currentBook)
      .subscribe(() => {

        this.loadBooks();

        // Close popup
        this.popupVisible = false;

      });
  }

}

  deleteBook(id: number) {
    if (confirm('Delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }
}