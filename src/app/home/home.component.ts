import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DxButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToShop() {
    this.router.navigate(['/books']);
  }
}