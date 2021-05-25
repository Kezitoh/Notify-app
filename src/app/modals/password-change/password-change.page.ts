import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {

  @Input() user: string;
  @Input() code: string;

  passwordForm: FormGroup = null;

  constructor(private modalCtrl: ModalController, private userService:UserService, 
    private router:Router, private uiService:UiService) { 
    this.passwordForm = new FormGroup({
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {

    const password = this.passwordForm.get('password').value;
    const password_c = this.passwordForm.get('confirmPassword').value;

    this.userService.resetPassword(this.user, password, password_c, this.code).then( res => {
      if(!res) {
        return;
      }
      this.router.navigate(['']);
      this.modalCtrl.dismiss();
    }, error => {
      this.uiService.presentToast('Formato de contraseña incorrecto', 'danger');
    });

    

  }

}
