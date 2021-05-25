import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import {} from '@angular/forms'
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import { PasswordChangePage } from '../../modals/password-change/password-change.page';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  
  restoreForm: FormGroup = null;
  hide = false;
  resetCode = null;
  constructor(private userService:UserService,
    private modalCtrl:ModalController, private uiService:UiService) { 
    this.restoreForm = new FormGroup({
      user: new FormControl()
    });
  }

  ngOnInit() {
  }

  onSubmit(fRestore: NgForm ) {
    const user = this.restoreForm.get('user').value;
    this.userService.getResetMail(user).then(res => {

      console.log(res);
      

      if(!res['ok']) {
        
        return this.uiService.presentToast(res['msg'], "danger");

      }
      this.hide = true;
      return this.uiService.presentToast(res['msg'], "success")

    });
    
  }

  async validateResetCode() {
    const user = this.restoreForm.get('user').value;
    const code = this.resetCode;
    
    this.userService.validateResetCode(user,code).then( async res => {

      if(!res['ok']) {
        
        return this.uiService.presentToast(res['message'], 'danger');
      }

      const modal = await this.modalCtrl.create({
        component: PasswordChangePage,
        componentProps: {
          'user': user,
          'code': code
        }
      });
      return await modal.present();

    });

    
    
  }

}
