import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPopoverComponent } from './filter-popover/filter-popover.component';



@NgModule({
  declarations: [HeaderComponent, NotificationComponent, NotificationsComponent, FilterComponent, FilterPopoverComponent],
  exports: [HeaderComponent, NotificationsComponent, FilterComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
