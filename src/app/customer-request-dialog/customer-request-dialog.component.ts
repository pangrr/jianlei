import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer-request-dialog',
  templateUrl: './customer-request-dialog.component.html',
  styleUrls: ['./customer-request-dialog.component.css']
})
export class CustomerRequestDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomerRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: Customer,
    private customerService: CustomerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.customerService.addCustomerRequest(this.customer).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
