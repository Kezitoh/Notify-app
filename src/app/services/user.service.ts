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

  usuario$: EventEmitter<any> = new EventEmitter<any>();
  notifications: any;
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

      }, err => {
        this.token = null;
        this.storage.clear();
        resolve(false);

      });

    });

  }

  register(user: User) {

    return new Promise<any>(resolve => {
      this.http.post<any>(`${URL}/register`, { id_group: user.id_group, id_role: user.id_role, is_active: user.is_activated, user: user.user, name: user.name, surname: user.surname, email: user.email, password: user.password })
        .subscribe(resp => {

          console.log(resp);

          resolve(resp.ok);

          // if (resp['error']) {
          //   this.token = null;
          //   this.storage.clear();
          //   resolve(false);
          // }

          // resolve(this.login(user.user, user.password));


        }, err => {
          resolve(err.ok)

        });
      // , error => {
      //   console.log(error);

    });
    // });

  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
    return this.token
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

      this.http.get(`${URL}/me`, { headers }).subscribe(resp => {

        if (resp['error']) {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
        console.log(resp);

        this.usuario = resp;

        this.usuario$.emit(this.usuario);//Emite al usuario al menú en app component para que muestre su nombre

        resolve(true);
      });

    });

  }



  async logout() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    this.http.post(`${URL}/logout`, {}, { headers: headers }).subscribe()

    this.token = null;
    this.usuario = null;
    await this.storage.clear();

    this.navCtrl.navigateRoot("/login", { animated: true });
  }

  setUserNotifications(notificationsuser) {
    this.notifications = notificationsuser

  }
  getUserNotifications(filters?: any[]) {




    let params: any = {
      user: this.usuario.id
    }
    if (filters) {
      params = {
        user: this.usuario.id,
        'filters[]': filters
      }
    }

    return new Promise<any>(resolve => {
      this.getHttpHeader().then(header => {



        this.http.get<Notification[]>(`${URL}/notifications`, { headers: header, params: params }).subscribe(res => {
          this.notifications = res
          resolve(this.notifications);

        });
      });
    });
  }

  getNotifications(filters?: any[]) {

    let params: any = {
    }
    if (filters) {
      params = {
        'filters[]': filters
      }
    }

    return new Promise<any[]>(resolve => {
      this.getHttpHeader().then(header => {

        this.http.get<any[]>(`${URL}/notifications`, { headers: header, params: params }).subscribe(res => {
          resolve(res);

        });
      });
    });
  }


  getUsers(params?: any, filters? :any[]) {

    console.log(params);
    
    if (filters) {
      params.push({filters: filters});
    }

    return new Promise<any>(resolve => {

      this.getHttpHeader().then(header => {

        this.http.get<any>(`${URL}/users`, { headers: header, params: params }).subscribe(res => {
          console.log(res);
          
          resolve(res.users);
        });

      });
    });

  }


  getResetMail(user) {

    return new Promise<any>(resolve => {

      this.http.post(`${URL}/sendReset`, { user: user }).subscribe(res => {



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
    const data = { user: user, password: password, password_confirmation: passwordConfirmation};

    return new Promise<any>((resolve, reject) => {

      this.http.post(`${URL}/reset`, data).subscribe(res => {

        resolve(res);
      }, error => {

        console.log(error);
        reject(true);

      });

    });
  }

  deleteUser(id: any) {
    
    return new Promise<any>(resolve => {
      this.getHttpHeader().then(header => {
      
        this.http.post(`${URL}/users/delete`, { 'id': id }, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }

  editUser(id: number, user: any) {
    
    return new Promise<any>(resolve => {
      
      this.getHttpHeader().then(header => {
        this.http.post(`${URL}/users/edit`, { id: id, values: user }, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }


  toggleActiveUser(id: any, value: any) {
    this.getHttpHeader().then(header => {

      return new Promise<any>(resolve => {

        this.http.post(`${URL}/users/toggleActive`, { 'id': id, 'value': value }, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }

}
