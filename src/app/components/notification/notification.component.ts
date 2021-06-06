import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../interfaces/interfaces';
import { NotificationService } from '../../services/notification.service';
import { DataService } from '../../services/data.service';
import { NotificationModalPage } from '../../modals/notification-modal/notification-modal.page';
import { ModalController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input('notification') notification: any;

  favorito: boolean;

  // attachments : any[] = [];
  attachment: any;

  content: string;

  constructor(
    private notificationService: NotificationService,
    private modalCtrl: ModalController,
    private uiService: UiService
  ) {}

  ngOnInit() {

    this.favorito = this.traduccionBoolean(this.notification.fav);

    console.log(this.favorito);
    

    if (this.notification.attachment != null) {
      // this.attachments = this.notificationService.getAttachments(this.notification);
      this.attachment = this.notificationService.getAttachments(
        this.notification
      );
    }

    if (this.notification.text.length > 180) {
      this.content = this.notification.text.slice(0, 180) + '... Leer más';
    } else {
      this.content = this.notification.text;
    }
  }

  favorite() {
    let fav;

    this.favorito = !this.favorito;
    console.log(this.favorito);
    

    if (this.favorito) {
      fav = 1;
    } else {
      fav = 0;
    }

    

    this.notificationService.setFavorite(this.notification, fav).then(() => {
      if (fav) {
        this.uiService.presentToast('Añadida noticia a favoritos', 'warning');
        return;
      }

      this.uiService.presentToast('Eliminada noticia de favoritos', 'light');
    });
  }

  async open_modal(notification: any) {
    const modal = await this.modalCtrl.create({
      component: NotificationModalPage,
      componentProps: {
        notification: notification,
      },
    });

    modal.onDidDismiss().then(() => {

      notification.is_read = this.traduccionBoolean(notification.is_read);
      console.log(notification.is_read);
      
      if (!notification.is_read) {
        this.notificationService.setRead(notification.user_notification_id);
      }
    });

    return await modal.present();
  }


  traduccionBoolean(elemento) {
    if(elemento == 1) {
      elemento = true;
    } else {
      elemento = false;
    }
    return elemento;
  }

}
