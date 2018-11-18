import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CustomerRequest } from '../customer-request';
import { CustomerRequestService } from '../customer-request.service';


@Component({
  selector: 'app-customer-request-dialog',
  templateUrl: './customer-request-dialog.component.html',
  styleUrls: ['./customer-request-dialog.component.css']
})
export class CustomerRequestDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomerRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customerRequest: CustomerRequest,
    private customerService: CustomerRequestService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.customerRequest.requestTime = new Date().toLocaleDateString();
    this.customerService.addCustomerRequest(this.customerRequest).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
