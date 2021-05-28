import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor() { }

  // configuracionInicial() {

  //  this.oneSignal.setLogLevel({
  //    logLevel:6,
  //    visualLevel: 1
  //   });

  //   this.oneSignal.startInit('2007b93e-a915-4aa8-8c7c-4520a00cfcf4','110318283501');

  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

  //   this.oneSignal.handleNotificationReceived().subscribe((noti) => {
  //     console.log('Notificacion recibida',noti);
  //     // this.notificacionRecibida(noti);
  //   });

  //   this.oneSignal.handleNotificationOpened().subscribe( async (noti) => {
  //     console.log('Notificacion abierta', noti);
  //     // await this.notificacionRecibida( noti.notification );
  //   });

  //   //Obtener ID del subscriptor

  //   this.oneSignal.getIds().then( info=> {
  //     // this.userId = info.userId;
  //     // console.log(this.userId);
  //   });

  //   this.oneSignal.endInit();
  // }




}
