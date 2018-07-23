import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { UploadCustomerDialogComponent } from '../upload-customer-dialog/upload-customer-dialog.component';

@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {
  public realestate: Realestate;
  public description: string[];
  public relatedRealestates: Realestate[] = [];

  constructor(
    private route: ActivatedRoute,
    private realestateService: RealestateService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
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
        realestate.images = this.replaceImageNamesWithUrls(realestate.images);

        this.description = realestate.description.split(/\r?\n/);

        realestate.relatedRealestateIds.forEach(_id => {
          this.realestateService.getRealestate(_id).subscribe(r => {
            r.images = this.replaceImageNamesWithUrls(r.images);
            this.relatedRealestates.push(r);
          });
        });

        this.realestate = realestate;
      });
  }

  openDialog(request: string): void {
    this.dialog.open(UploadCustomerDialogComponent, {
      width: '250px',
      data: { phone: '', request, realestateId: this.realestate._id }
    });
  }

  gotoRealestate(id: string): void {
    this.router.navigateByUrl(`/realestate/${id}`);
  }

  private replaceImageNamesWithUrls(names: string[]): string[] {
    const imagesDir = 'http://182.254.161.202:3000/api/realestate/image/';
    return names.map(n => `${imagesDir}${n}`);
  }

}
