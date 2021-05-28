import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationService } from '../../services/notification.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-notification-tracking-modal',
  templateUrl: './notification-tracking-modal.page.html',
  styleUrls: ['./notification-tracking-modal.page.scss'],
})
export class NotificationTrackingModalPage implements OnInit {

  @Input() notification: any;

  // attachments : any[] = [];
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
