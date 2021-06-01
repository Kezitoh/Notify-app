import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController } from '@ionic/angular';
import { GroupModalPage } from '../../modals/group-modal/group-modal.page';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  groups: any[];

  constructor(private dataService:DataService,
    private modalCtrl:ModalController) { }

  ngOnInit() {

    this.dataService.getGroups().then( groups => {
      this.groups = groups;
    });

  }

  async open_modal( group ) {
    const modal = await this.modalCtrl.create({
      component: GroupModalPage,
      componentProps: {
        group: group
      }
    });

    await modal.present();
  }

}
