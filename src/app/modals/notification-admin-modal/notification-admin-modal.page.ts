import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-admin-modal',
  templateUrl: './notification-admin-modal.page.html',
  styleUrls: ['./notification-admin-modal.page.scss'],
})
export class NotificationAdminModalPage implements OnInit {

  @Input('notification') notification:any;

  attachment: any;
  terminosAceptados: boolean = false;

  constructor(private modalCtrl: ModalController, private notificationService: NotificationService,
    private dataService: DataService) { }

  ngOnInit() {

    const attachments = this.notificationService.getAttachments(this.notification);
    // console.log(attachments);

    if (attachments != null) {
      this.attachment = this.notificationService.getAttachments(this.notification);
      //   this.attachments = attachments;
      //   console.log("att",this.attachments);
    }


  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  
  checkboxChanged(event) {
    
    this.terminosAceptados = event.detail.checked;
    
  }


  download(index?) {

    const url = "/download?filename=" + this.attachment;
    // const url = "/download?filename="+this.attachments[index];


    return this.dataService.getPermission(url);
  }

}
