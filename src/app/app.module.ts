// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// 3rd party
import { SlideshowModule } from 'ng-simple-slideshow';
import { AngularFileUploaderModule } from 'angular-file-uploader';

// custom
import { RealestateComponent } from './realestate/realestate.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { RealestateService } from './realestate.service';



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
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,

    SlideshowModule,
    AngularFileUploaderModule
  ],
  providers: [RealestateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
