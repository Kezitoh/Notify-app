import { Injectable, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { NotificationTrackingModalPage } from '../../modals/notification-tracking-modal/notification-tracking-modal.page';
import { NotificationService } from '../../services/notification.service';
import { NotificationsComponent } from '../notifications/notifications.component';


@Injectable({
  providedIn: 'root'
})

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
    private popoverCtrl: PopoverController,
    public notificationsComponent:NotificationsComponent,
    private loadingCtrl:LoadingController) { }

  ngOnInit() {}


  async delet() {
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
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration:2000,
              translucent: true,
              spinner: 'bubbles',
              showBackdrop: false
            });
            await loader.present();
            this.notificationService.delete(this.notification).then(()=>{
              this.notificationsComponent.actualizarLista().then(()=> {
                loader.dismiss();
              });
            });
            console.log("Borrado");
            
          },
          
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
