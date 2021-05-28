import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationTrackingModalPageRoutingModule } from './notification-tracking-modal-routing.module';

import { NotificationTrackingModalPage } from './notification-tracking-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationTrackingModalPageRoutingModule
  ],
  declarations: [NotificationTrackingModalPage]
})
export class NotificationTrackingModalPageModule {}
