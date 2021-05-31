import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { FilterComponent } from '../filter/filter.component';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @Input('admin') admin: any

  notifications: Notification[];
  refresher: any;

  constructor(private userService: UserService,
    public filterComponent: FilterComponent) { 
      this.refresher = document.getElementById('refresh');
    }

  ngOnInit() {
    
    this.filterComponent.data$.subscribe(filtros => {
      console.log("alwlo");

      switch (filtros.filterType) {
        case "user":
          this.userService.getUsers(filtros.filters).then(res => {
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

  //TODO: Conseguir recargar la lista de notificaciones al borrar notificacion
  prueba() {
    var event = new Event('ionRefresh');
    this.refresher.dispatchEvent(event);
    // this.zone.run((e)=>{
    this.getNotifications();

    console.log("actualizado!");

    // });



  }


  doRefresh(event) {
    console.log('Begin async operation');

    console.log(event);

    this.getNotifications();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getNotifications() {
    if (this.admin) {
      console.log("outbox");

      this.userService.getNotifications().then(notifications => {
        this.notifications = notifications;
      });
      return;
    } else {
      this.userService.getUserNotifications().then(notifications => {
        this.notifications = notifications;
        console.log(notifications);

      });
    }
  }

}
