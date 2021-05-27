import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import { NotificationModalPage } from '../../modals/notification-modal/notification-modal.page';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @Input('admin') admin: any

  notifications : Notification[];
  
  constructor(private userService: UserService, private modalCtrl:ModalController,
    public filterComponent:FilterComponent) { }

   ngOnInit() {
     
     this.filterComponent.data$.subscribe(filtros => {
       console.log("alwlo");
       
       switch (filtros.filterType) {
         case "user":
           this.userService.getUsers(filtros.filters).then( res => {
             console.log(res);
             this.notifications = res;
           });
           break;
         case "admin":
           this.userService.getAdminNotifications(filtros.filters).then(res => {
             console.log(res);
             this.notifications = res;
           });
           break;
         default:
           this.userService.getUserNotifications(filtros.filters).then(res => {
             console.log(res);
             this.notifications = res;
           });
   
           break;
       }
       
       console.log("filtro aplicado?");
       
     });

    this.getNotifications();

  }


  doRefresh(event) {
    console.log('Begin async operation');

   this.getNotifications();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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

  getNotifications() {
    if(this.admin) {
      console.log("outbox");
      
      this.userService.getAdminNotifications().then(notifications => {
       this.notifications = notifications;
     });
     return;
    }
   this.userService.getUserNotifications().then(notifications => {
     this.notifications = notifications;
     console.log(notifications);
     
   });
  }

}
