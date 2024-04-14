import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  exchangeDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.exchangeDetails = data;
  }
}
