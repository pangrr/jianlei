import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RealestateService } from '../realestate.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { Realestate, Redpocket, VisitingServices, Consultant } from '../realestate';

import { ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-upload',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedTabIndex = 0;

  // tab 0
  realestateDisplayedColumns: string[] = ['name', 'view', 'edit', 'delete'];
  realestateDataSource;

  // tab 1
  @Input() afuConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: { url: 'http://182.254.161.202:3000/api/realestate/images' },
    multiple: true
  };
  realestate: Realestate;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // tab 2
  customerDisplayedColumns: string[] = ['phone', 'realestate', 'request'];
  customerDataSource;

  constructor(
    private realestateService: RealestateService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public snackBar: MatSnackBar
  ) {
    this.clearRealestateToEdit();

    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl('assets/cancel.svg'));
  }

  ngOnInit(): void {
    this.getRealestatesAndCustomers();
  }

  applyRealestateFilter(filterValue: string) {
    this.realestateDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyCustomerFilter(filterValue: string) {
    this.customerDataSource.filter = filterValue.trim().toLowerCase();
  }


  addImageFromUpload(event): void {
    this.realestate.images.push(JSON.parse(event.response));
  }

  saveNewRealestate(): void {
    this.realestateService.addRealestate(this.realestate)
    .subscribe(savedRealestate => {
      this.realestate._id = savedRealestate._id;
      this.openSnackBar('新房产已保存');
      this.getRealestatesAndCustomers();
    });
  }

  updateRealestate(): void {
    this.realestateService.updateRealestate(this.realestate)
      .subscribe(_ => {
        this.openSnackBar('房产已更新');
        this.getRealestatesAndCustomers();
      });
  }

  deleteRealestate(id: string): void {
    this.realestateService.deleteRealestate(id).subscribe(_ => this.getRealestatesAndCustomers());
  }

  removeRelatedRealestate(id: string): void {
    const index = this.realestate.relatedRealestateIds.indexOf(id);

    if (index >= 0) {
      this.realestate.relatedRealestateIds.splice(index, 1);
    }
  }

  addRelatedRealestate(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.realestate.relatedRealestateIds.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  addImage(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.realestate.images.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeImage(image: string): void {
    const index = this.realestate.images.indexOf(image);

    if (index >= 0) {
      this.realestate.images.splice(index, 1);
    }
  }

  removeComment(index: number): void {
    this.realestate.comments.splice(index, 1);
  }

  addEmptyComment(): void {
    this.realestate.comments.push({
      account: '',
      text: '',
      date: ''
    });
  }

  loadRealestateToEdit(id: string): void {
    this.selectedTabIndex = 1;
    this.realestateService.getRealestate(id)
      .subscribe(r => this.realestate = r);
  }

  clearRealestateToEdit(): void {
    this.realestate = {} as Realestate;
    this.realestate.redpocket = {} as Redpocket;
    this.realestate.consultant = {} as Consultant;
    this.realestate.visitServices = {} as VisitingServices;
    this.realestate.comments = [];
    this.realestate.images = [];
    this.realestate.relatedRealestateIds = [];
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
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
}
