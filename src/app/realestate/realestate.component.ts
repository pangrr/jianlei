import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';

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
    private realestateService: RealestateService
  ) {}

  ngOnInit(): void {
    this.getRealestate();
  }

  getRealestate(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.realestateService.getRealestate(id)
      .subscribe(realestate => {
        this.imageUrls = realestate.images.map(i => `http://localhost:3000/realestate/image/${i}`);
        this.description = realestate.description.split('\n');
        this.realestate = realestate;
      });
  }
}
