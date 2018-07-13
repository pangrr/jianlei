import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { CustomerInfoDialogComponent } from '../customer-info-dialog/customer-info-dialog.component';

@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {
  realestate: Realestate;
  imageUrls: string[];
  description: string[];

  constructor(
    private route: ActivatedRoute,
    private realestateService: RealestateService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/phone.svg'));
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/account.svg'));
  }

  ngOnInit(): void {
    this.getRealestate();
  }

  getRealestate(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.realestateService.getRealestate(id)
      .subscribe(realestate => {
        this.imageUrls = realestate.images.map(i => `http://localhost:3000/realestate/image/${i}`);
        this.description = realestate.description.split(/\r?\n/);
        this.realestate = realestate;
      });
  }

  openDialog(action: string): void {
    this.dialog.open(CustomerInfoDialogComponent, {
      width: '250px',
      data: { phone: '', action }
    });
  }

}
