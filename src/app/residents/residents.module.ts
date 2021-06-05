import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentsActions, residentsStore } from './store';
import { ResidentListComponent } from './components/resident-list/resident-list.component';

@NgModule({
  declarations: [
    ResidentListComponent
  ],
  imports: [CommonModule],
  providers: [
    ResidentsActions,
    { provide: 'ResidentsStore', useValue: residentsStore },
  ],
})
export class ResidentsModule {}
