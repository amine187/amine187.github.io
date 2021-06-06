import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResidentEditComponent } from './components';
import { ResidentsComponent } from './residents.component';

export const routes: Routes = [
  {
    path: 'residents',
    children: [
      {
        path: '',
        component: ResidentsComponent,
      },
      {
        path: ':id/edit',
        component: ResidentEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentsRoutingModule {}
