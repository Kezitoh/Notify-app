import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NotificationService } from '../../services/notification.service';
import { NotificationTrackingModalPage } from '../../modals/notification-tracking-modal/notification-tracking-modal.page';
import { NotificationPopoverComponent } from '../notification-popover/notification-popover.component';

@Component({
  selector: 'app-notification-admin',
  templateUrl: './notification-admin.component.html',
  styleUrls: ['./notification-admin.component.scss'],
})
export class NotificationAdminComponent implements OnInit {

  @Input('notification') notification:any;

  attachment :any ;

  content: string;


  constructor(private notificationService:NotificationService,
    private modalCtrl: ModalController,
    private popoverCtrl:PopoverController) { }

  ngOnInit() {
    // console.log("a", this.notification.attachment);
    
    if(this.notification.attachment != null){
      // this.attachments = this.notificationService.getAttachments(this.notification);
      this.attachment = this.notificationService.getAttachments(this.notification);
    }

    if(this.notification.text.length > 180) {
      this.content = (this.notification.text.slice(0,180)+"... Leer más");
    }else{
      this.content = (this.notification.text);
    }
    

  }

  async open_menu(event) {
    const popover = await this.popoverCtrl.create({
      component: NotificationPopoverComponent,
      event: event,
      componentProps: {
        notification: this.notification
      }
    });

    await popover.present();

    console.log("a",(await popover.onDidDismiss()).data);
    

  }

  async open_modal(notification: Notification) {
    const modal = await this.modalCtrl.create({
      component: NotificationTrackingModalPage,
      componentProps:{
        'notification': notification
      }
    });

    // modal.onDidDismiss().then(()=> {

    //   this.notifications$.

    // });
    return await modal.present();
  }

}
