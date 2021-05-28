import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTypePage } from './create-type.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTypePageRoutingModule {}
