import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RealestateComponent } from './realestate/realestate.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'realestate/:id', component: RealestateComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'map', component: MapComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
