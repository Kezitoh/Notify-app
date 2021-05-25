import { Component, OnInit } from '@angular/core';
import { Notification } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  constructor(private userService:UserService,
    private menuController:MenuController) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    
    this.menuController.enable(true);
    
  }

}
