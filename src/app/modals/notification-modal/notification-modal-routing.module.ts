import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationModalPage } from './notification-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationModalPageRoutingModule {}
