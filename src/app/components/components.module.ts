import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPopoverComponent } from './filter-popover/filter-popover.component';
import { NotificationPopoverComponent } from './notification-popover/notification-popover.component';
import { NotificationAdminComponent } from './notification-admin/notification-admin.component';
import { OptionsPopoverComponent } from './options-popover/options-popover.component';



@NgModule({
  declarations: [HeaderComponent, NotificationComponent, NotificationsComponent, FilterComponent, FilterPopoverComponent, NotificationPopoverComponent, NotificationAdminComponent, OptionsPopoverComponent],
  exports: [HeaderComponent, NotificationsComponent, FilterComponent, NotificationPopoverComponent, NotificationAdminComponent, OptionsPopoverComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
