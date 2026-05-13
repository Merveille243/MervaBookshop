import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBooksComponent } from './customer-books.component';

describe('CustomerBooksComponent', () => {
  let component: CustomerBooksComponent;
  let fixture: ComponentFixture<CustomerBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerBooksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerBooksComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
