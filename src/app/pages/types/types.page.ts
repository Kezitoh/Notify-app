import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { TypeModalPage } from '../../modals/type-modal/type-modal.page';
import { EditTypePage } from '../../modals/edit-type/edit-type.page';
import { OptionsPopoverComponent } from '../../components/options-popover/options-popover.component';

@Component({
  selector: 'app-types',
  templateUrl: './types.page.html',
  styleUrls: ['./types.page.scss'],
})
export class TypesPage implements OnInit {

  types: any[];
  refresher: any;

  constructor(private dataService: DataService,
    private modalCtrl: ModalController, private popoverCtrl: PopoverController) {
    this.refresher = document.getElementById('refresh');
  }

  ngOnInit() {
    this.getTypes();
  }

  getTypes() {
    this.dataService.getTypes().then(types => {
      this.types = types;
    });
  }

  doRefresh(event) {
    this.getTypes();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async open_modal(type) {

    const modal = await this.modalCtrl.create({
      component: TypeModalPage,
      componentProps: {
        type: type
      }
    });

    await modal.present();

  }

  async open_menu(type, event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopoverComponent,
      componentProps: {
        data: type,
        type: 'type'
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
    this.getTypes();

    console.log("actualizado!");

    // });
  }


}
