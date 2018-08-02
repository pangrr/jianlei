import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-upload',
  templateUrl: './customer-request-list.component.html',
  styleUrls: ['./customer-request-list.component.css']
})
export class CustomerRequestListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'realestate', 'request', 'delete'];
  dataSource;

  constructor(
    private customerService: CustomerService,
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
    this.customerService.deleteCustomerRequest(id)
      .subscribe(_ => this.getCustomerRequests());
  }

  private getCustomerRequests(): void {
    this.customerService.getCustomerRequests()
      .subscribe(requests => {
        this.dataSource = new MatTableDataSource(requests);
      });
  }
}
