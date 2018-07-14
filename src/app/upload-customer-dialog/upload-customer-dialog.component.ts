import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-upload-customer-dialog',
  templateUrl: './upload-customer-dialog.html',
  styleUrls: ['./upload-customer-dialog.css']
})
export class UploadCustomerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UploadCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: Customer,
    private customerService: CustomerService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.customerService.addCustomer(this.customer).subscribe(_ => this.dialogRef.close());
  }
}
