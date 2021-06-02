import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTypePageRoutingModule } from './edit-type-routing.module';

import { EditTypePage } from './edit-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTypePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditTypePage]
})
export class EditTypePageModule {}
