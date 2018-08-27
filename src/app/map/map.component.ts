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

  onMapReady(map: any) {
    this.map = map;

    const point = new BMap.Point(116, 39.915);

    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);

    const label = new BMap.Label(
      `<a href="http://localhost:4200/realestates" target="_blank" style="color: white;background: rgb(228, 0, 0);">
      重庆市外国语学校
      </a>`,
      { position: point }
    );
    map.addOverlay(label);
  }

  ngOnDestroy() {}
}
