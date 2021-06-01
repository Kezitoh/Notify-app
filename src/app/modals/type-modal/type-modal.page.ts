import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.page.html',
  styleUrls: ['./type-modal.page.scss'],
})
export class TypeModalPage implements OnInit {

  @Input('type') type: any;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

}
