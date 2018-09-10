import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RealestateService } from '../realestate.service';
import { Realestate, News } from '../realestate';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities: string[] = [];
  news: News[] = [];

  realestateControl = new FormControl();
  realestates: Realestate[];
  filteredRealestates: Observable<string[] | Realestate[]>;

  buttons = [
    { image: 'new', name: '新房' },
    { image: 'used', name: '二手房' },
    { image: 'rent', name: '租房' },
    { image: 'sale', name: '卖房' },
    { image: 'search', name: '求购房源' },
    { image: 'paint', name: '装修' },
    { image: 'calculator', name: '计算器' },
    { image: 'map', name: '地图找房' }
  ];

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

      this.cities = this.collectCitiesFromRealestates(realestates);
      this.news = this.collectNewsFromRealestates(realestates);

      this.filteredRealestates = this.realestateControl.valueChanges
        .pipe(
          startWith<string | Realestate>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterRealestates(name) : this.realestates.slice())
        );

      this.realestates = realestates;
    });
  }

  private collectCitiesFromRealestates(realestates: Realestate[]): string[] {
    return realestates.map(realestate => realestate.city);
  }

  private collectNewsFromRealestates(realestates: Realestate[]): News[] {
    let news: News[] = [];
    realestates.forEach(realestate => news = news.concat(realestate.news));
    return news;
  }
}
