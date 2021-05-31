import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationAdminModalPage } from './notification-admin-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationAdminModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationAdminModalPageRoutingModule {}
