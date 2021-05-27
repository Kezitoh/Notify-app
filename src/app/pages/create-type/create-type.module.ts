import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTypePageRoutingModule } from './create-type-routing.module';

import { CreateTypePage } from './create-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTypePageRoutingModule
  ],
  declarations: [CreateTypePage]
})
export class CreateTypePageModule {}
