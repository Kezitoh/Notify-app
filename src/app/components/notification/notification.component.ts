import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../interfaces/interfaces';
import { NotificationService } from '../../services/notification.service';
import { DataService } from '../../services/data.service';
import { NotificationModalPage } from '../../modals/notification-modal/notification-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input('notification') notification: Notification;

  favorito: boolean = false;

  // attachments : any[] = [];
  attachment :any ;

  content: string;

  constructor(private notificationService:NotificationService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    // console.log("a", this.notification.attachment);
    
    if(this.notification.attachment != null){
      // this.attachments = this.notificationService.getAttachments(this.notification);
      this.attachment = this.notificationService.getAttachments(this.notification);
    }

    if(this.notification.text.length > 180) {
      this.content = (this.notification.text.slice(0,180)+"... Leer más");
    }else{
      this.content = (this.notification.text);
    }
    

  }

  favorite() {
    this.favorito = !this.favorito;
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
