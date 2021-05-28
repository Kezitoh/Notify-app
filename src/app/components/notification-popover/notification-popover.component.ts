import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { NotificationTrackingModalPage } from '../../modals/notification-tracking-modal/notification-tracking-modal.page';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-popover',
  templateUrl: './notification-popover.component.html',
  styleUrls: ['./notification-popover.component.scss'],
})
export class NotificationPopoverComponent implements OnInit {

  @Input('notification') notification: any;

  constructor(private modalCtrl: ModalController,
    private notificationService:NotificationService,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController) { }

  ngOnInit() {}


  delet() {
    this.showDeleteAlert();
    this.popoverCtrl.dismiss();
  }

  edit() {

    this.popoverCtrl.dismiss();
  }

  async showDeleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Borrar notificación',
      subHeader: '¿Estás seguro que quieres eliminar esta notificación?',
      message: 'Esta acción no se podrá deshacer.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.notificationService.delete(this.notification);
            console.log("Borrado");
            
          }
        },
        {
          text: 'Cancelar',
          handler: () => {this.alertCtrl.dismiss();}
        }
      ]
    });
    
    await alert.present();
    
  }

  async tracking() {
    const modal = await this.modalCtrl.create({
      component: NotificationTrackingModalPage,
      componentProps: {
        notification: this.notification
      }
    });

    await modal.present();

    this.popoverCtrl.dismiss();
  }

}
