import { Injectable } from '@angular/core';
import { AlertController, ToastController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toastCtrl: ToastController,
    private alertCtrl: AlertController, private modalCtrl: ModalController) {
  }

  // Crea un toast con el mensaje y el color 
  async presentToast(msg: string, color?: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  async presentAlert(header, subheader, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subheader,
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    await alert.present();
  }

}
