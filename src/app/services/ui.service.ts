import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor( private toastCtrl: ToastController ) { }

  async presentToast( msg: string, color?: string ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}
