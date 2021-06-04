import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import {
  AlertController,
  MenuController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { PasswordChangePage } from '../../modals/password-change/password-change.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm;

  logRegSlide = {
    allowTouchMove: false,
  };
  logged: boolean;

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private navCtrl: NavController,
    private menuController: MenuController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public loadingController: LoadingController
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  async login() {
    const loadingLogin = await this.loadingController.create({
      message: 'Por favor espere...',
      duration: 2000,
    });
    loadingLogin.present().then(() => {
      let user = this.loginForm.get('user').value;
      let password = this.loginForm.get('password').value;
      this.userService.login(user, password).then((res) => {
        loadingLogin.dismiss();
        this.logged = this.userService.usuario.has_logged == 1 ? true : false;
        console.log(this.logged);

        if (this.logged) {
          console.log('entro por aqui');
          this.navCtrl.navigateRoot('/inbox', {
            animated: true,
            replaceUrl: true,
          });
        } else {
          this.responseForm(res, 'Usuario y/o contraseña incorrectos');
        }
      }).catch(err => {
        this.responseForm(false, 'Usuario y/o contraseña incorrectos');
      });
    });
  }

  async responseForm(res: any, msg?: string) {
    if (!res) {
      this.uiService.presentToast(msg, 'danger');
      return false;
    }

    if (!this.logged) {
      if (!(await this.propFirstTimeAlert())) {
        return false;
      }
      // TODO: Actualizar has_logged a 1
    }
    // this.navCtrl.navigateRoot('/inbox', { animated: true });
    return true;
  }

  forgotPass() {}

  async propFirstTimeAlert() {
    const header = 'Bienvenido, ';
    const subheader = this.userService.usuario.name +' '+ this.userService.usuario.surname;
    const message ='<b>Vemos que eres nuevo por aquí.</b><br><br>Para continuar, debes crear una contraseña segura a continuación.';
    let res;
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subheader,
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: async () => {
            const modal = await this.modalCtrl.create({
              component: PasswordChangePage,
              componentProps: {
                user: this.userService.usuario.user,
              },
            });
            modal.onDidDismiss().then((data) => {
              res = data.data;
            });
            return await modal.present();
          },
        },
      ],
    });

    await alert.present();
    return res;
  }
}
