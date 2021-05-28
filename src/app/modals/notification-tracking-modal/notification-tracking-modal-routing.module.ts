import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationTrackingModalPage } from './notification-tracking-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationTrackingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationTrackingModalPageRoutingModule {}
