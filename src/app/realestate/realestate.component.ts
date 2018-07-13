import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { CustomerDialogComponent } from '../customer-info-dialog/customer-info-dialog.component';

@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {
  private imagesDir = 'http://localhost:3000/realestate/image/';

  realestate: Realestate;
  description: string[];
  relatedRealestates: Realestate[] = [];

  constructor(
    private route: ActivatedRoute,
    private realestateService: RealestateService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router
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
        realestate.images = realestate.images.map(i => `${this.imagesDir}${i}`);

        this.description = realestate.description.split(/\r?\n/);

        realestate.relatedRealestateIds.forEach(_id => {
          this.realestateService.getRealestate(_id).subscribe(r => {
            r.images = r.images.map(_i => `${this.imagesDir}${_i}`);
            this.relatedRealestates.push(r);
          });
        });

        this.realestate = realestate;
      });
  }

  openDialog(action: string): void {
    this.dialog.open(CustomerDialogComponent, {
      width: '250px',
      data: { phone: '', action }
    });
  }

  gotoRealestate(id: string): void {
    this.router.navigateByUrl(`/realestate/${id}`);
  }

}
