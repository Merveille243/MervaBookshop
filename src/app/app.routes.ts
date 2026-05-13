import { Routes } from '@angular/router';
import { HomeComponent }          from './home/home.component';
import { BookListComponent }      from './book-list/book-list.component';
import { AboutComponent }         from './about/about.component';
import { ContactComponent }       from './contact/contact.component';
import { CustomerBooksComponent } from './customer-books/customer-books.component';
import { MyOrdersComponent }      from './my-orders/my-orders.component';
import { AdminOrdersComponent }   from './admin-orders/admin-orders.component';

export const routes: Routes = [
  { path: '',             component: HomeComponent },
  { path: 'about',        component: AboutComponent },
  { path: 'contact',      component: ContactComponent },
  { path: 'admin/books',  component: BookListComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'shop',         component: CustomerBooksComponent },
  { path: 'my-orders',    component: MyOrdersComponent },
];