import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { RealestateService } from '../realestate.service';


@Component({
  selector: 'app-upload',
  templateUrl: './realestate-list.component.html',
  styleUrls: ['./realestate-list.component.css']
})
export class RealestateListComponent implements OnInit {
  selectedTabIndex = 0;

  realestateDisplayedColumns: string[] = ['name', 'view', 'edit', 'delete'];
  realestateDataSource;


  constructor(
    private realestateService: RealestateService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRealestates();
  }

  applyRealestateFilter(filterValue: string) {
    this.realestateDataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteRealestate(id: string): void {
    this.realestateService.deleteRealestate(id)
      .subscribe(_ => this.getRealestates());
  }

  private getRealestates(): void {
    this.realestateService.getRealestates()
      .subscribe(realestates => {
        this.realestateDataSource = new MatTableDataSource(realestates);
      });
  }
}
