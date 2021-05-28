import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @Input('admin') admin: any

  notifications : Notification[];
  
  constructor(private userService: UserService,
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
           this.userService.getNotifications(filtros.filters).then(res => {
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

  getNotifications() {
    if(this.admin) {
      console.log("outbox");
      
      this.userService.getNotifications().then(notifications => {
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
