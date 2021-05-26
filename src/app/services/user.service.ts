import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Notification, User } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { UiService } from './ui.service';
import { PasswordChangePage } from '../modals/password-change/password-change.page';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  usuario$: EventEmitter<User> = new EventEmitter<User>();
  usuario: any;
  

  constructor(private http: HttpClient,
    private storage: Storage, private navCtrl: NavController, public modalCtrl: ModalController) {
    this.initStorage();

  }

  async initStorage() {
    const storage = await this.storage.create();
  }

  login(user: string, password: string) {

    const data = { user, password };

    return new Promise<any>(resolve => {

      this.http.post(`${URL}/login`, data).subscribe(async resp => {


        if (!resp['ok']) {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }

        await this.guardarToken(resp['token']);

        resolve(true);

      });

    });

  }

  register(user: User) {
    
    // return new Promise<boolean>(resolve => {
      this.http.post(`${URL}/register`, {id_group: user.id_group, id_role: user.id_role, is_active: user.is_activated, user: user.user, name: user.name, surname: user.surname, email: user.email})
      .subscribe( resp => {

          console.log(resp);

          // if (resp['error']) {
          //   this.token = null;
          //   this.storage.clear();
          //   resolve(false);
          // }

          // resolve(this.login(user.user, user.password));


        });
        // , error => {
        //   console.log(error);

        // });
    // });

  }

  async guardarToken(token: string) {
    this.token = token;

    await this.validaToken();
    await this.storage.set('token', token);

    

  }

  async cargarToken() {

    this.token = await this.storage.get('token') || null;

  }

  async validaToken() {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/me`, { headers })
        .subscribe(resp => {
          if (resp['error']) {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

          this.usuario = resp;
          this.usuario$.emit(this.usuario)//Emite al usuario al menú en app component para que muestre su nombre

          console.log(this.usuario);

          resolve(true);
        });
    });

  }

  getUsuario() {

    if (!this.usuario.id) {
      this.validaToken();
    }

    return { ...this.usuario };

  }

  async logout() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    this.http.post(`${URL}/logout`, {}, {headers:headers}).subscribe()
    
    this.token = null;
    this.usuario = null;
    await this.storage.clear();

    this.navCtrl.navigateRoot("/login", { animated: true });
  }

  getUserNotifications() {


    return new Promise<any>(resolve => {
      this.getHttpHeader().then( header => {

        this.http.get<Notification[]>(`${URL}/notifications?user=${this.usuario.id}`, { headers: header }).subscribe( res => {
          resolve(res);

        });
      });
  });
}

getAdminNotifications() {
  return new Promise<any>(resolve => {
    this.getHttpHeader().then( header => {
       
      this.http.get<Notification[]>(`${URL}/notifications?creator=${this.usuario.id}`, { headers: header }).subscribe( res => {
        resolve(res);

      });
    });
});
}


getResetMail(user) {

  return new Promise<any>(resolve => {

    this.http.post(`${URL}/sendReset`, { user: user }).subscribe(res => {

      console.log(res);


      if (!res['ok']) {
        resolve({ ok: false, msg: res["message"] });
      }

      resolve({ ok: true, msg: res["message"] });

    });
  })
}

async getHttpHeader() {
  await this.cargarToken();
  const token = this.token;

  const headers = new HttpHeaders({
    'x-token': token
  });

  return headers;
}

validateResetCode(user: string, code: string) {


  return new Promise<any>(resolve => {

    this.http.get(`${URL}/reset?user=${user}&code=${code}`).subscribe(res => {

      console.log(res);

      resolve(res);

    });

  });


}

resetPassword(user, password, passwordConfirmation, code) {
  const data = { user: user, password: password, password_confirmation: passwordConfirmation, code: code };

  return new Promise<any>((resolve, reject) => {

    this.http.post(`${URL}/reset`, data).subscribe(res => {
      console.log(res);

      resolve(res);
    }, error => {

      console.log(error);   
      reject(true);

    });

  });


}

}
