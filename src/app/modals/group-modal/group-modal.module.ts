import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupModalPageRoutingModule } from './group-modal-routing.module';

import { GroupModalPage } from './group-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupModalPageRoutingModule
  ],
  declarations: [GroupModalPage]
})
export class GroupModalPageModule {}
