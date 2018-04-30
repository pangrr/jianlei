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
  @Input() realestate: Realestate;

  constructor(
    private route: ActivatedRoute,
    private realestateService: RealestateService
  ) { }

  ngOnInit(): void {
    this.getRealestate();
  }

  getRealestate(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.realestateService.getRealestate(id)
      .subscribe(realestate => this.realestate = realestate);
  }
}
