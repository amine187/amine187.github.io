import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentsActions, residentsStore } from './store';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ResidentsActions,
    { provide: 'ResidentsStore', useValue: residentsStore },
  ],
})
export class ResidentsModule {}
