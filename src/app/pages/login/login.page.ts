import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { MenuController, NavController } from '@ionic/angular';

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

  constructor(private userService: UserService,
    private uiService: UiService, private navCtrl: NavController,
    private menuController:MenuController) {
    this.loginForm = new FormGroup({
      user: new FormControl(),
      password: new FormControl()
   });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }


  async login( fLogin: NgForm ) {
    
    let user = this.loginForm.get('user').value;
    let password = this.loginForm.get('password').value;
    await this.userService.login(user,password).then(res => {
      
      this.responseForm(res, "Usuario y/o contraseña incorrectos");
  
    }); 
    
  }

  async responseForm(res: any, msg?: string) {
    
    if( !res ) {
      this.uiService.presentToast(msg,"danger");
      return false;
    }else if( res == "newbie" ) {
      console.log("entro");
      
      
    }

    this.navCtrl.navigateRoot( '/inbox', { animated: true } );

  }

  forgotPass() {

  }

}
