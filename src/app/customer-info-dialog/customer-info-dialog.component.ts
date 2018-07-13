import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CustomerInfo {
  phone: string;
  action: string;
}

@Component({
  selector: 'app-customer-info-dialog',
  templateUrl: './customer-info-dialog.html',
  styleUrls: ['./customer-info-dialog.css']
})
export class CustomerInfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomerInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customerInfo: CustomerInfo) {
      console.log(this.customerInfo);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close();
  }
}
