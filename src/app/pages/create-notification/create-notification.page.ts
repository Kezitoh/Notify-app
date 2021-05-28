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
  base:any;

  constructor(private dataService: DataService,
    private notificationService: NotificationService,
    private uiService: UiService, public platform:Platform) {
    this.notificationForm = new FormGroup({
      title: new FormControl(),
      text: new FormControl(),
      type: new FormControl(),
      groups: new FormControl(),
      users: new FormControl(),
    });
  }

  
  async prueba(){
  
    
  }

  getBase64(event) {
    let me = this;
    let file = event[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    this.base =  reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
      return reader.result
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  ngOnInit() {
    this.dataService.getTypes().then(types => {
      this.types = types;
    });
    this.dataService.getGroups().then(groups => {
      this.groups = groups;
    });
    this.dataService.getUsers().then(users => {
      this.users = users;
    });

    this.cordova = this.isCordova();

  }

  onSubmit() {

    const groups = this.notificationForm.get('groups').value;
    const users = this.notificationForm.get('users').value;

    console.debug("groups", groups);
    console.log("users", users);


    // this.notificationForm.get();
    const title = this.notificationForm.get('title').value;
    const text = this.notificationForm.get('text').value;
    const type_name = this.notificationForm.get('type').value;

    const type = this.types.find(nombre => nombre.name == type_name);
    
    let attachment = this.attachment;
    if(attachment != undefined) {
      const path = attachment.path;
      let name: string = attachment.path;
      name = name.substr(name.lastIndexOf('/') + 1);

      let date = new Date();
      const now = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();

      attachment = now + name;
  
      this.dataService.upload(path , now);

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


    this.notification = {
      id_type: type.id,
      text: text,
      title: title,
      users: (users != undefined) ? users : [],
      groups: (groups != undefined) ? groups : [],
      attachment: (attachment != undefined) ? attachment : ''
      // attachments: this.attachments.join('|')
    };

    this.notificationService.create(this.notification);
    this.uiService.presentToast('Notificación creada exitosamente!', 'success');

    this.resetForm();


  }

  async addAttachment() {
    this.dataService.chooseFile().then(file => {

      this.attachment = file
      // this.attachments.push(file);

    });

  }

  isCordova() {
    if (window.hasOwnProperty("cordova")) {
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

    window.PreviewAnyFile.previewPath(win => {
      if (win == "SUCCESS") {
        console.log('success')
      } else if (win == "CLOSING") {
        console.log('closing')
      } else if (win == "NO_APP") {
        console.log('no suitable app to open the file (mainly will appear on android')
      } else {
        console.log('error')
      }
    },
      error => console.error("open failed", error),
      file
    );
  }

  resetForm() {
    this.notificationForm.reset();
    this.attachment = undefined;
    // this.attachments = [];
  }


}
