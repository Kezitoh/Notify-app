import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterPopoverComponent } from '../filter-popover/filter-popover.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(public popoverCtrl:PopoverController,
    private userService:UserService) { }

  ngOnInit() {}

  async filter($event: any) {
    const data = await this.presentPopover($event);
    let filters: any [] = [];
    for(let filter of data) {
      if(filter.checked) {
        filters.push(filter.id);
      }
    }
    console.log(filters);
    this.userService.getAdminNotifications();
  }

  async presentPopover( ev: any) {
    let data: any;
    const popver = await this.popoverCtrl.create({
      component: FilterPopoverComponent,
      event: ev
       
    });
    
    await popver.present();
    await popver.onDidDismiss().then( res => {
      data = res.data
    });
    return data;
  }

}
