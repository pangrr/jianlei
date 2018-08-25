import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbmComponent } from 'angular-baidu-maps';

declare const BMap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  options: any = {};
  @ViewChild('map') mapComp: AbmComponent;
  private map: any;

  constructor() {}

  ngOnInit() {}

  onReady(map: any) {
    this.map = map;
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity('北京');
    map.enableScrollWheelZoom(true);
  }

  ngOnDestroy() {}
}
