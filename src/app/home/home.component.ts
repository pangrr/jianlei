import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RealestateService } from '../realestate.service';
import { Realestate } from '../realestate';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cityControl = new FormControl();
  cities: string[] = ['杭州', '苏州', '上海', '嘉兴', '湖州', '南宁', '昆山', '南京', '平湖'];
  filteredCities: Observable<string[]>;

  realestateControl = new FormControl();
  realestates: Realestate[];
  filteredRealestates: Observable<string[] | Realestate[]>;

  constructor(
    private realestateService: RealestateService
  ) { }

  ngOnInit() {
    this.getRealestates();
  }

  displayRealestate(realestate?: Realestate): string | undefined {
    return realestate ? realestate.name : undefined;
  }

  private filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  private filterRealestates(name: string): Realestate[] {
    const filterValue = name.toLowerCase();
    return this.realestates.filter(realestate => realestate.name.toLowerCase().includes(filterValue));
  }

  private getRealestates(): void {
    this.realestateService.getRealestates().subscribe(realestates => {
      realestates.forEach(realestate => this.realestateService.replaceImageNamesWithImageUrls(realestate));

      this.realestates = realestates;

      this.filteredRealestates = this.realestateControl.valueChanges
        .pipe(
          startWith<string | Realestate>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterRealestates(name) : this.realestates.slice())
        );

      this.filteredCities = this.cityControl.valueChanges
        .pipe(
          startWith<string>(''),
          map(value => this.filterCities(value))
        );
    });
  }

}
