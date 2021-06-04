import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { GroupModalPage } from '../../modals/group-modal/group-modal.page';
import { EditGroupPage } from '../../modals/edit-group/edit-group.page';
import { OptionsPopoverComponent } from '../../components/options-popover/options-popover.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  groups: any[] = [];
  refresher: any;

  constructor(private dataService: DataService,
    private modalCtrl: ModalController, private popoverCtrl: PopoverController) {
    this.refresher = document.getElementById('refresh');
  }

  ngOnInit() {

    this.getGroups();

  }

  traduccionBoolean(elemento) {
    if (elemento == 1) {
      elemento = true;
    } else {
      elemento = false;
    }
    return elemento;
  }

  doRefresh(event) {
    this.getGroups();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getGroups() {
    this.dataService.getGroups().then(groups => {
      this.groups = groups;
      this.groups.forEach((group) => {
        group.is_active = this.traduccionBoolean(group.is_active);
      });
    });
  }

  async open_modal(group) {
    const modal = await this.modalCtrl.create({
      component: GroupModalPage,
      componentProps: {
        group: group
      }
    });

    await modal.present();
  }

  async open_menu(group, event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopoverComponent,
      componentProps: {
        data: group,
        type: 'group'
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
    this.getGroups();

    console.log("actualizado!");

    // });
  }


}
