import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'residents',
    pathMatch: 'full',
  },
  {
    path: 'residents',
    loadChildren: () =>
      import('./residents/residents.module').then((m) => m.ResidentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
