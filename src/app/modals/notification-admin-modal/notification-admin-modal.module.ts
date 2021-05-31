import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationAdminModalPageRoutingModule } from './notification-admin-modal-routing.module';

import { NotificationAdminModalPage } from './notification-admin-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationAdminModalPageRoutingModule
  ],
  declarations: [NotificationAdminModalPage]
})
export class NotificationAdminModalPageModule {}
