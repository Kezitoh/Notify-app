import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interfaces/interfaces';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { UiService } from '../../services/ui.service';

declare var window: any;

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.page.html',
  styleUrls: ['./create-notification.page.scss'],
})
export class CreateNotificationPage implements OnInit {
  notificationForm: FormGroup;
  groups: any[];
  types: any[];
  users: any[];
  notification: Notification;
  cordova: boolean;
  // attachments: any[] = [];
  attachment: any;
  previews: any[] = [];
  base: any;
  attachpc: any;
  attachpc64: any;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private uiService: UiService,
    public platform: Platform
  ) {
    this.notificationForm = new FormGroup({
      title: new FormControl(),
      text: new FormControl(),
      type: new FormControl(),
      groups: new FormControl(),
      users: new FormControl(),
    });
  }

  async attachPc() {
    var attach = (<HTMLFormElement>document.getElementById('file-upload')).files[0];
    this.attachpc = attach.name;
    this.attachpc64 = this.getBase64(attach);
  }

  getBase64(event) {
    let me = this;
    let file = event;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    this.base = reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(JSON.stringify(reader.result));
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  ngOnInit() {
    this.dataService.getTypes().then((types) => {
      this.types = types;
    });
    this.dataService.getGroups().then((groups) => {
      this.groups = groups;
    });
    this.dataService.getUsers().then((users) => {
      this.users = users;
    });

    this.cordova = this.isCordova();
  }

  async onSubmit() {
    console.log(this.notificationForm.get('type').value);

    const groups: any[] = this.notificationForm.get('groups').value;
    const users: any[] = this.notificationForm.get('users').value;
    
    let user_ids = [];

    if(users != null) {
      users.forEach((user) => {
        user_ids.push(user.id);        
      });

    }
    
    let group_ids = [];

    if(groups != null) {
      groups.forEach((group) => {
        group_ids.push(group.id);
      });

    }

    
    console.debug("groups", groups);
    console.log("users", users);


    // this.notificationForm.get();
    const title = this.notificationForm.get('title').value;
    const text = this.notificationForm.get('text').value;
    const type = this.notificationForm.get('type').value;
    

    let attachment = this.attachment;
    if (attachment != undefined) {
      const path = attachment.path;
      let name: string = attachment.path;
      name = name.substr(name.lastIndexOf('/') + 1);

      let date = new Date();
      const now = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();

      attachment = now + name;

      this.dataService.upload(path, now);

    }
    

    // SELECCIÓN MÚLTIPLE DE ATTACHMENTS
    // this.attachments.forEach((attachment, i) => {
    //   this.dataService.upload(attachment.path);
    //   let name: string = attachment.path;
    //   attachment.path = name.substr(name.lastIndexOf('/')+1);
    //   let date = new Date();
    //   const now =""+date.getFullYear()+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds();
    //   attachment = now+attachment.path;

    //   this.attachments[i] = attachment

    // },this.attachments);

    // console.log("a",this.attachments);
console.log(attachment);

    this.notification = {
      id_type: type.id,
      text: text,
      title: title,
      users: user_ids != undefined ? user_ids : [],
      groups: group_ids != undefined ? group_ids : [],
      attachment: attachment != undefined ? attachment : '',
      // attachments: this.attachments.join('|')
    };
    console.log("notificaciooon!",this.notification);
    

    const res = await this.notificationService.create(this.notification);
    if(!res) {
      this.uiService.presentToast('Error creando notificación', 'danger');
      return false;  
    }
    this.uiService.presentToast('Notificación creada exitosamente!', 'success');

    this.resetForm();
  }

  async addAttachment() {
    this.dataService.chooseFile().then((file) => {
      this.attachment = file;
      // this.attachments.push(file);
    });
  }

  isCordova() {
    if (window.hasOwnProperty('cordova')) {
      return true;
    }
    return false;
  }

  delete(item?) {
    this.attachment = undefined;
    // this.attachments.splice(item,1);
  }

  preview(file: string) {
    file = file.replace(/ /g, '%20');

    window.PreviewAnyFile.previewPath(
      (win) => {
        if (win == 'SUCCESS') {
          console.log('success');
        } else if (win == 'CLOSING') {
          console.log('closing');
        } else if (win == 'NO_APP') {
          console.log(
            'no suitable app to open the file (mainly will appear on android'
          );
        } else {
          console.log('error');
        }
      },
      (error) => console.error('open failed', error),
      file
    );
  }

  resetForm() {
    this.notificationForm.reset();
    this.attachment = undefined;
    // this.attachments = [];
  }
}
