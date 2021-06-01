import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.page.html',
  styleUrls: ['./group-modal.page.scss'],
})
export class GroupModalPage implements OnInit {

  @Input('group') group: any;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

}
