import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Customer {
  phone: string;
  action: string;
}

@Component({
  selector: 'app-customer-info-dialog',
  templateUrl: './customer-info-dialog.html',
  styleUrls: ['./customer-info-dialog.css']
})
export class CustomerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: Customer) {
      console.log(this.customer);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close();
  }
}
