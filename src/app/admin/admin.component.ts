import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RealestateService } from '../realestate.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { Realestate } from '../realestate';

@Component({
  selector: 'app-upload',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  realestateDisplayedColumns: string[] = ['name', 'id'];
  realestateDataSource;

  customerDisplayedColumns: string[] = ['phone', 'realestate', 'request'];
  customerDataSource;

  constructor(
    private realestateService: RealestateService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getRealestatesAndCustomers();
  }

  private getRealestatesAndCustomers(): void {
    this.realestateService.getRealestates()
      .subscribe(realestates => {
        this.realestateDataSource = new MatTableDataSource(realestates);

        this.customerService.getCustomers()
          .subscribe(customers => {

            this.customerDataSource = new MatTableDataSource(this.addRealestateNameToCustomers(customers, realestates));
          });
      });
  }

  private addRealestateNameToCustomers(customers: Customer[], realestates: Realestate[]): any[] {
    return customers.map(c => {
      return { ...c, realestateName: this.findRealestateNameById(c.realestateId, realestates) };
    });
  }

  private findRealestateNameById(id: string, realestates: Realestate[]): string {
    return realestates.reduce((name, r) => {
      if (r._id === id) {
        return r.name;
      } else {
        return name;
      }
    }, '');
  }


  applyRealestateFilter(filterValue: string) {
    this.realestateDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyCustomerFilter(filterValue: string) {
    this.customerDataSource.filter = filterValue.trim().toLowerCase();
  }
}
