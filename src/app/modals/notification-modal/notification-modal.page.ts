import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Notification } from 'src/app/interfaces/interfaces';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.page.html',
  styleUrls: ['./notification-modal.page.scss'],
})
export class NotificationModalPage implements OnInit {

  @Input() notification: Notification;

  // attachments : any[] = [];
  attachment: any;

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

  download(index?) {

    const url = "/download?filename=" + this.attachment;
    // const url = "/download?filename="+this.attachments[index];


    return this.dataService.getPermission(url);
  }

}
