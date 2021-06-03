import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { NotificationTrackingModalPage } from '../notification-tracking-modal/notification-tracking-modal.page';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

@Component({
  selector: 'app-notification-admin-modal',
  templateUrl: './notification-admin-modal.page.html',
  styleUrls: ['./notification-admin-modal.page.scss'],
})
export class NotificationAdminModalPage implements OnInit {

  @Input('notification') notification: any;

  attachment: any;
  terminosAceptados: boolean = false;

  constructor(private modalCtrl: ModalController, private notificationService: NotificationService,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {

    const attachments = this.notificationService.getAttachments(this.notification);
     console.log(attachments);

    if (attachments != null) {
      this.attachment = this.notificationService.getAttachments(this.notification);
      //   this.attachments = attachments;
         console.log("att",this.attachment);
    }


  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  delet() {
    this.showDeleteAlert().then(() => {


    });
  }

  async showDeleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Borrar notificación',
      subHeader: '¿Estás seguro que quieres eliminar esta notificación?',
      message: 'Esta acción no se podrá deshacer.',
      buttons: [
        {
          text: 'Ok',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000,
              translucent: true,
              spinner: 'bubbles',
              showBackdrop: false
            });
            await loader.present();
            this.notificationService.delete(this.notification).then(() => {
              this.notificationsComponent.actualizarLista().then(() => {
                loader.dismiss();
                this.modalCtrl.dismiss();
              });
            });
            console.log("Borrado");

          },

        },
        {
          text: 'Cancelar',
          handler: () => { this.alertCtrl.dismiss(); }
        }
      ]
    });

    await alert.present();

    await alert.onDidDismiss();
  }

  async tracking() {
    this.dismiss();
    const loading = await this.loadingCtrl.create({
      duration: 2000
    });
    const modal = await this.modalCtrl.create({
      component: NotificationTrackingModalPage,
      cssClass: 'fullscreen',
      componentProps: {
        notification: this.notification
      }
    });
    
    await modal.present();
    loading.dismiss();
    
  }

  download(index?) {

    const url = "/download?filename=" + this.attachment;
    // const url = "/download?filename="+this.attachments[index];


    return this.dataService.getPermission(url);
  }

}
