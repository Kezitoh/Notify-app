import { Component, OnInit, Input } from '@angular/core';
import * as EventEmitter from 'events';
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

  @Input() enFavoritos: boolean = false;

  notificationsOG : any [];// Array original completo
  notifications: Notification[];// Array modificable por búsqueda
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
            this.notificationsOG = res;
          });
          break;
        case "admin":
          this.userService.getNotifications(filtros.filters).then(res => {
            console.log(res);
            this.notificationsOG = res;
          });
          break;
        default:
          this.userService.getUserNotifications(filtros.filters).then(res => {
            console.log(res);
            this.notificationsOG = res;
          });

          break;
      }
      this.notifications = this.notificationsOG;

      console.log("filtro aplicado?");

    });


    // this.notifications = 
    this.getNotifications();
    

  }

  //TODO: Conseguir recargar la lista de notificaciones al borrar notificacion
  async actualizarLista() {
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
        
        this.notificationsOG = notifications
        this.notifications = this.notificationsOG;
      });
      return;
    } else {
      this.userService.getUserNotifications().then(notifications => {
        
        if (this.enFavoritos) {
          notifications = notifications.filter(notification => notification.fav == true);

        }

        this.notificationsOG = notifications;
        this.notifications = this.notificationsOG;
        console.log(notifications);

      });
    }
    
  }

  loadNotifs(notificaciones) {
    this.notifications = notificaciones;
  }

  // Busca solo por inicio
  onSearchChange(event) {
    console.log(event.target.value);
    // const reg = new RegExp(event.target.value,"gi")
    const filtro = this.notificationsOG.filter((notification) => notification.title.toLowerCase().includes(event.target.value.toLowerCase()));
    this.loadNotifs(filtro);
    
  }

}
