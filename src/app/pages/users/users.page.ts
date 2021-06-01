import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import { UserModalPage } from '../../modals/user-modal/user-modal.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: any[];

  constructor(private userService:UserService,
    private modalCtrl:ModalController) { }

  ngOnInit() {

    this.userService.getUsers().then( users => {
      console.log(users);

      this.users = users;
      
    });

  }

  async open_modal( user ) {
    const modal = await this.modalCtrl.create({
      component: UserModalPage,
      componentProps: {
        user: user
      }
    });

    await modal.present();
  }

}
