import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { AlertController, MenuController, NavController, ModalController } from '@ionic/angular';
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
    allowTouchMove: false
  };

  constructor(private userService: UserService, private uiService: UiService, private navCtrl: NavController, private menuController: MenuController, private alertCtrl: AlertController, private modalCtrl: ModalController, public loadingController: LoadingController) {

    this.loginForm = new FormGroup({
      user: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }


  async login(fLogin: NgForm) {
    const loadingLogin = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loadingLogin.present();

    let user = this.loginForm.get('user').value;
    let password = this.loginForm.get('password').value;
    this.userService.login(user, password).then((res) => {

      loadingLogin.dismiss().then(()=>{
        if (res) {
              console.log("entro por aqui");
            this.navCtrl.navigateRoot('/inbox', { animated: true,replaceUrl:true });
        }
        
        // this.responseForm(res, "Usuario y/o contraseña incorrectos");

      });
      

    });
  }




  async responseForm(res: any, msg?: string) {

    if (!res) {
      this.uiService.presentToast(msg, "danger");
      return false;
    }

    if (! await this.userService.usuario.has_logged) {
      if(! await this.propFirstTimeAlert()) {
        return false;
      }
      // TODO: Actualizar has_logged a 1
    }
    this.navCtrl.navigateRoot('/inbox', { animated: true });
    return true;

  }

  forgotPass() {

  }

  async propFirstTimeAlert() {
    const header = "¡Hola, " + this.userService.usuario.name + "!";
    const subheader = "Vemos que eres nuevo por aquí";
    const message = "Para continuar, cambia tu contraseña por una más segura a continuación.";
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
                'user': this.userService.usuario.user
              }
            });
            modal.onDidDismiss().then(data => {
              res = data.data;
            });
            return await modal.present();
          }
        }
      ]
    });

    await alert.present();
    return res;
  }

}
