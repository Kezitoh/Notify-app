import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.page.html',
  styleUrls: ['./group-modal.page.scss'],
})
export class GroupModalPage implements OnInit {

  @Input('group') group: any;

  groupUsers: any[] = [];

  constructor(private modalCtrl:ModalController,
    private userService:UserService) { }

  ngOnInit() {
    this.userService.getUsers({group: this.group.id}).then(users => {
      this.groupUsers = users;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

}
