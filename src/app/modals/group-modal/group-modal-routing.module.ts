import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupModalPage } from './group-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GroupModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupModalPageRoutingModule {}
