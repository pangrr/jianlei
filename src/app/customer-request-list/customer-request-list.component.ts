import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerRequestService } from '../customer-request.service';
import { CustomerRequest } from '../customer-request';


@Component({
  selector: 'app-upload',
  templateUrl: './customer-request-list.component.html',
  styleUrls: ['./customer-request-list.component.css']
})
export class CustomerRequestListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'customerName', 'customerPhone', 'realestate', 'request', 'requestTime', 'note', 'delete'];
  dataSource;

  constructor(
    private customerRequestService: CustomerRequestService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.getCustomerRequests();
  }

  applyCustomerFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCustomerRequest(id: string): void {
    this.customerRequestService.deleteCustomerRequest(id)
      .subscribe(_ => this.getCustomerRequests());
  }

  updateCustomerRequest(customerRequest: CustomerRequest): void {
    this.customerRequestService.updateCustomerRequest(customerRequest)
      .subscribe(_ => {});
  }

  private getCustomerRequests(): void {
    this.customerRequestService.getCustomerRequests()
      .subscribe(customerRequests => {
        this.dataSource = new MatTableDataSource(customerRequests.map((customerRequest, i) => ({...customerRequest, index: i + 1})));
      });
  }
}
