import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.page.html',
  styleUrls: ['./user-modal.page.scss'],
})
export class UserModalPage implements OnInit {

  @Input('user') user: any;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    console.log(this.user);
    
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

}
