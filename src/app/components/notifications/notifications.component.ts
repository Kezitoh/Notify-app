import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import { NotificationModalPage } from '../../modals/notification-modal/notification-modal.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @Input('admin') admin: any

  notifications : Notification[];
  
  constructor(private userService: UserService, private modalCtrl:ModalController) { }

   ngOnInit() {
     if(this.admin) {
       console.log("outbox");
       
       this.userService.getAdminNotifications().then(notifications => {
        this.notifications = notifications;
      });
      return;
     }
    this.userService.getUserNotifications().then(notifications => {
      this.notifications = notifications;
    });
    
  }
 
  async open_modal(notification: Notification) {
    const modal = await this.modalCtrl.create({
      component: NotificationModalPage,
      componentProps:{
        'notification': notification
      }
    });
    return await modal.present();
  }

}
