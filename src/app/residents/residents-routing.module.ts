import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResidentsComponent } from './residents.component';

export const routes: Routes = [
  {
    path: 'residents',
    children: [
      {
        path: '',
        component: ResidentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ResidentsRoutingModule {}
