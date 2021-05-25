import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutboxPageRoutingModule } from './outbox-routing.module';

import { OutboxPage } from './outbox.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutboxPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OutboxPage]
})
export class OutboxPageModule {}
