import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalController } from '@ionic/angular';
import { TypeModalPage } from '../../modals/type-modal/type-modal.page';

@Component({
  selector: 'app-types',
  templateUrl: './types.page.html',
  styleUrls: ['./types.page.scss'],
})
export class TypesPage implements OnInit {

  types: any[];

  constructor(private dataService:DataService,
    private modalCtrl:ModalController) { }

  ngOnInit() {
    this.dataService.getTypes().then(types =>{
      this.types = types;
    }); 
  }

  async open_modal( type ) {

    const modal = await this.modalCtrl.create({
      component: TypeModalPage,
      componentProps: {
        type: type
      }
    });

    await modal.present();

  }

}
