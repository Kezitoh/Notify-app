import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUserPageRoutingModule } from './create-user-routing.module';

import { CreateUserPage } from './create-user.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateUserPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [CreateUserPage]
})
export class CreateUserPageModule {}
