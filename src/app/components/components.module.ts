import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsComponent } from './notifications/notifications.component';



@NgModule({
  declarations: [HeaderComponent, NotificationComponent, NotificationsComponent],
  exports: [HeaderComponent, NotificationsComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
