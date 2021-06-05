import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentsActions, residentsStore } from './store';
import { ResidentListComponent } from './components';
import { ResidentsRoutingModule } from './residents-routing.module';
import { ResidentsComponent } from './residents.component';
import { ResidentFilterComponent } from './components/resident-filter/resident-filter.component';

@NgModule({
  declarations: [
    ResidentsComponent,
    ResidentListComponent,
    ResidentFilterComponent,
  ],
  imports: [CommonModule, ResidentsRoutingModule],
  providers: [
    ResidentsActions,
    { provide: 'ResidentsStore', useValue: residentsStore },
  ],
  exports: [ResidentsComponent],
})
export class ResidentsModule {}
