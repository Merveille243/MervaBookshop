import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DxTextBoxModule, DxButtonModule, DxTextAreaModule } from 'devextreme-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DxTextBoxModule, DxButtonModule, DxTextAreaModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  submitted = false;

  sendMessage() {
    if (this.name && this.email && this.message) {
      this.submitted = true;
    }
  }
}