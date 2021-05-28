import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification, User } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';
import { UserService } from './user.service';
import { UiService } from './ui.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor (private http:HttpClient, private userService:UserService,
    private uiService:UiService) { }

  create( notification:Notification) {

    return new Promise<any>(resolve => {
      
      this.getToken().then( token => {
        
        const headers = new HttpHeaders({
          'x-token': token
        });
        // console.log("AWWWW",notification);
        
        this.http.post(`${URL}/notifications/create`, {'type': notification.id_type,'title': notification.title,'text': notification.text,'attachment': notification.attachment,'user': notification.users, 'group': notification.groups}, {headers: headers }).subscribe( res => {
          
          resolve(res);

        });
      });
      
    });

  }

  delete(notification) {
    return new Promise<any>(resolve => {

      this.getToken().then(token => {
        const headers = new HttpHeaders({
          'x-token': token
        });

        this.http.post(`${URL}/notifications/delete`, {id: notification.id}, {headers: headers}).subscribe( res => {
          resolve(res);
        });

      });

    });
  }


  getAttachments(notification:Notification) {
    // let attachments = notification.attachments.split('|');
    // attachments.forEach((attachment, i)=>{
    //   attachments[i] = attachment.substr(12)
    // });
    // return attachments;
    let attachment = notification.attachment
    return attachment;
  }

  async getToken() {
    await this.userService.cargarToken()
    
    return this.userService.token;
  }

}
