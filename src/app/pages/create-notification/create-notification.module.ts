import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNotificationPageRoutingModule } from './create-notification-routing.module';

import { CreateNotificationPage } from './create-notification.page';
import { ComponentsModule } from '../../components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    IonicSelectableModule,

    FormsModule,
    IonicModule,
    CreateNotificationPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [CreateNotificationPage]
})
export class CreateNotificationPageModule {}
