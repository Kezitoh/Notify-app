import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NotificationService } from '../../services/notification.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-notification-tracking-modal',
  templateUrl: './notification-tracking-modal.page.html',
  styleUrls: ['./notification-tracking-modal.page.scss'],
})
export class NotificationTrackingModalPage implements OnInit {

  @Input() notification: any;

  
  users_notifications: any[] = [];
  no_leidos : any[] = [];
  leidos: any[] = [];
  dests:number;

  constructor(private modalCtrl: ModalController,
    private notificationService: NotificationService,
    private loadingController:LoadingController) { }

  ngOnInit() { 

    //TODO: Mostrar loading mientras carga

    this.notificationService.getUsers_NotificationsByNotifications(this.notification.id).then( resp => {
      this.users_notifications = resp.Users_Notifications;
      this.dests = this.users_notifications.length;
      console.log(this.users_notifications.length);
      
      const copy = resp.Users_Notifications;
      
      const cut = copy.findIndex(element => element.datetime_read != null);
      this.leidos = copy.splice(cut);
      this.no_leidos = copy;
    });
    

  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }



}
