import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RealestateComponent } from './realestate/realestate.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'realestate/:id', component: RealestateComponent },
  { path: 'map', component: MapComponent },
  { path: 'search', component: SearchComponent },
  { path: 'upload', component: UploadComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
