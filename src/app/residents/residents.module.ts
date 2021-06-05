import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ResidentsActions, residentsStore } from './store';
import { ResidentListComponent } from './components';
import { ResidentsRoutingModule } from './residents-routing.module';
import { ResidentsComponent } from './residents.component';
import { ResidentFilterComponent } from './components/resident-filter/resident-filter.component';
import { ResidentAssignComponent } from './components/resident-assign/resident-assign.component';

@NgModule({
  declarations: [
    ResidentsComponent,
    ResidentListComponent,
    ResidentFilterComponent,
    ResidentAssignComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ResidentsRoutingModule],
  providers: [
    ResidentsActions,
    { provide: 'ResidentsStore', useValue: residentsStore },
  ],
  exports: [ResidentsComponent],
})
export class ResidentsModule {}
