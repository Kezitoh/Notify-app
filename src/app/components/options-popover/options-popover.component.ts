import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController, PopoverController, LoadingController } from '@ionic/angular';
import { NotificationsComponent } from '../notifications/notifications.component';
import { DataService } from '../../services/data.service';
import { TypesPage } from '../../pages/types/types.page';
import { UserService } from '../../services/user.service';
import { UsersPage } from '../../pages/users/users.page';
import { GroupsPage } from '../../pages/groups/groups.page';
import { EditTypePage } from '../../modals/edit-type/edit-type.page';
import { EditUserPage } from '../../modals/edit-user/edit-user.page';
import { EditGroupPage } from '../../modals/edit-group/edit-group.page';

@Component({
  selector: 'app-options-popover',
  templateUrl: './options-popover.component.html',
  styleUrls: ['./options-popover.component.scss'],
})
export class OptionsPopoverComponent implements OnInit {

  @Input('data') data: any;
  @Input('type') type: any;

  constructor(private modalCtrl: ModalController,
    private dataService: DataService,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    public notificationsComponent: NotificationsComponent,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private typesPage: TypesPage,
    private usersPage: UsersPage,
    private groupsPage: GroupsPage) { }

  ngOnInit() { }


  delet() {
    this.showDeleteAlert();
    this.popoverCtrl.dismiss();
  }

  async showDeleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Borrar notificación',
      subHeader: '¿Estás seguro que quieres eliminar esta notificación?',
      message: 'Esta acción no se podrá deshacer.',
      buttons: [
        {
          text: 'Ok',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000,
              translucent: true,
              spinner: 'bubbles',
              showBackdrop: false
            });
            await loader.present();
            switch (this.type) {
              case "type":
                this.dataService.deleteType(this.data.id);
                await this.typesPage.actualizarLista();
                break;
              case "user":
                this.userService.deleteUser(this.data.id);
                await this.usersPage.actualizarLista();
                break;
              case "group":
                this.dataService.deleteType(this.data.id);
                await this.groupsPage.actualizarLista();
                break;
            }
            // this.dataService.delete(this.data).then(()=>{
            // this.datasComponent.actualizarLista().then(()=> {
            loader.dismiss();
            // });
            // });
            console.log("Borrado");

          },

        },
        {
          text: 'Cancelar',
          handler: () => { this.alertCtrl.dismiss(); }
        }
      ]
    });

    await alert.present();


  }

  toggleActive() {

    this.data.is_active = !this.data.is_active;

    let value;
    if (this.data.is_active) {
      value = 1;
    } else {
      value = 0;
    }
    switch (this.type) {
      case "type":
        this.dataService.toggleActiveType(this.data.id, value);
        break;
      case "user":
        this.userService.toggleActiveUser(this.data.id, value);
        break;
      case "group":
        this.dataService.toggleActiveGroup(this.data.id, value);
        break;
    }

    // this.dataService.toggleActive(this.data.id, value);

    this.popoverCtrl.dismiss();
  }


  async edit() {
    let modal;
    switch (await this.type) {
      case "type":
        modal = await this.modalCtrl.create({
          component: EditTypePage,
          componentProps: {
            type: this.data
          }
        });
        break;
      case "user":
        modal = await this.modalCtrl.create({
          component: EditUserPage,
          componentProps: {
            user: this.data
          }
        });
        break;
      case "group":
        modal = await this.modalCtrl.create({
          component: EditGroupPage,
          componentProps: {
            group: this.data
          }
        });
        break;
    }
    // const modal = await this.modalCtrl.create({
    // component: EditUserPage,
    // componentProps: {
    //   user: data
    // }
    // });

    await modal.present();
  }

}
