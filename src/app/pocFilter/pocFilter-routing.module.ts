import { NgModule } from '@angular/core';
import {Routes, RouterModule  } from '@angular/router';
import { PocFilterComponent } from './pocFilter.component';

const routes: Routes = [
  {
    path: '',
    component: PocFilterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocRoutingModule {}
