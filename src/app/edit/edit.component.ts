import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Realestate, Redpocket, VisitingServices, Consultant } from '../realestate';
import { RealestateService } from '../realestate.service';
import { MatTableDataSource } from '../../../node_modules/@angular/material';


@Component({
  selector: 'app-upload',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() afuConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: { url: 'http://localhost:3000/realestate/images' },
    multiple: true,
    theme: 'dragNDrop'
  };

  realestate: Realestate;
  realestateDataSource;
  realestateDisplayedColumns: string[] = ['select', 'name'];

  constructor(
    private realestateService: RealestateService,
    private route: ActivatedRoute
  ) {
    this.realestate = {} as Realestate;
    this.realestate.redpocket = {} as Redpocket;
    this.realestate.consultant = {} as Consultant;
    this.realestate.visitServices = {} as VisitingServices;
    this.realestate.comments = [];
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRealestate(id);
    }

    this.getRealestates();
  }

  private getRealestate(id: string): void {
    this.realestateService.getRealestate(id)
      .subscribe(r => this.realestate = r);
  }

  addImages(event): void {
    this.realestate.images = JSON.parse(event.response);
  }

  addRealestate(): void {
    this.realestateService.addRealestate(this.realestate)
    .subscribe(savedRealestate => this.realestate._id = savedRealestate._id);
  }

  updateRealestate(): void {
    this.realestateService.updateRealestate(this.realestate, this.realestate._id);
  }

  getRealestates(): void {
    this.realestateService.getRealestates()
      .subscribe(rs => this.realestateDataSource = new MatTableDataSource(rs));
  }
}
