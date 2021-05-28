import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTypePageRoutingModule } from './create-type-routing.module';

import { CreateTypePage } from './create-type.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTypePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [CreateTypePage]
})
export class CreateTypePageModule {}
