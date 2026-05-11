import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '',        component: HomeComponent },
  { path: 'books',   component: BookListComponent },
  { path: 'about',   component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];