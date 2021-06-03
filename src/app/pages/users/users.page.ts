import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserModalPage } from '../../modals/user-modal/user-modal.page';
import { EditUserPage } from '../../modals/edit-user/edit-user.page';
import { OptionsPopoverComponent } from '../../components/options-popover/options-popover.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: any[];
  refresher: any;

  constructor(private userService: UserService,
    private modalCtrl: ModalController, private popoverCtrl: PopoverController) {
    this.refresher = document.getElementById('refresh');
  }

  ngOnInit() {

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().then(users => {
      console.log(users);

      this.users = users;

    });
  }

  doRefresh(event) {
    this.getUsers();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async open_modal(user) {
    const modal = await this.modalCtrl.create({
      component: UserModalPage,
      componentProps: {
        user: user
      }
    });

    await modal.present();
  }

  async open_menu(user, event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopoverComponent,
      componentProps: {
        data: user,
        type: 'user'
      },
      event: event
    });

    await popover.present();

  }

  async actualizarLista() {
    var event = new Event('ionRefresh');
    this.refresher.dispatchEvent(event);
    // this.refresher.dispatchEvent(event);
    // this.zone.run((e)=>{
    this.getUsers();

    console.log("actualizado!");

    // });



  }

}
