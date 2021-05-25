import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../interfaces/interfaces';
import { NotificationService } from '../../services/notification.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input('notification') notification: Notification;

  // attachments : any[] = [];
  attachment :any ;

  content: string;

  constructor(private notificationService:NotificationService) { }

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

}
