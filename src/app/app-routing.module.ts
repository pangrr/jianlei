import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RealestateComponent } from './realestate/realestate.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { CustomerRequestListComponent } from './customer-request-list/customer-request-list.component';
import { RealestateEditorComponent } from './realestate-editor/realestate-editor.component';
import { RealestateListComponent } from './realestate-list/realestate-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/realestates', pathMatch: 'full' },
  { path: 'realestate/:id', component: RealestateComponent },
  { path: 'customers', component: CustomerRequestListComponent },
  { path: 'realestates', component: RealestateListComponent },
  { path: 'edit', component: RealestateEditorComponent },
  { path: 'edit/:id', component: RealestateEditorComponent },
  { path: 'map', component: MapComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
