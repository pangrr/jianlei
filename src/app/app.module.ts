import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MapComponent } from './map/map.component';
import { RealestateComponent } from './realestate/realestate.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { RealestateService } from './realestate.service';

import {SlideshowModule} from 'ng-simple-slideshow';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    RealestateComponent,
    SearchComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlideshowModule
  ],
  providers: [RealestateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
