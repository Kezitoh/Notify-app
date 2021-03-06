import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Componente } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';
import { UserService } from './user.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController } from '@ionic/angular';
import { UiService } from './ui.service';
declare var window: any;


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  //Servicio de recuperación de datos variados

  constructor(private http: HttpClient, private userService: UserService,
    private transfer: FileTransfer, private file: File,
    private fileChooser: FileChooser, private filePath: FilePath, private androidPermissions: AndroidPermissions, public loadingCtrl: LoadingController,
    private uiService:UiService) {

  }


  ngOnInit() {

  }

  getMenuOpts() { //Obtiene opciones para usuarios generales
    return this.http.get<Componente[]>('assets/data/menu-opts.json');
  }

  getAdminOpts() { //Obtiene opciones para admins
    return this.http.get<Componente[]>('assets/data/admin-opts.json');
  }

  getTypes() { //Obtiene los tipos de notificaciones
    return new Promise<any>(resolve => {
      this.getHttpHeader().then(header => {
        this.http.get(`${URL}/types`, { headers: header }).subscribe(res => {
          console.log(res);
          
          resolve(res);

        });

      });

    });

  }

  getGroups() { //Obtiene los grupos de trabajadores

    return new Promise<any>(resolve => {
      this.getHttpHeader().then(header => {
        this.http.get(`${URL}/groups`, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }

  createGroup(group) {

    return new Promise<any>(resolve => {

      this.getHttpHeader().then(header => {

        this.http.post<any>(`${URL}/groups/create`, { 'name': group.name, 'description': group.description, 'active': group.active }, { headers: header }).subscribe(res => {

          resolve(res.ok);

        }, err => {
          resolve(err.ok);
        });

      });

    });

  }

  createType(type) {

    return new Promise<any>(resolve => {

      this.getHttpHeader().then(header => {

        this.http.post<any>(`${URL}/types/create`, { 'name': type.name, 'description': type.description, 'active': type.active }, { headers: header }).subscribe(res => {

          resolve(res.ok);

        }, err => {
          resolve(err.ok)

        });

      });
    });


  }


  upload(file, date?) {
    this.userService.cargarToken();
    const token = this.userService.token;
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: date + file.substr(file.lastIndexOf('/') + 1),
      headers: { 'x-token': token }
    }

    console.warn(file.substr(file.lastIndexOf('/') + 1));


    fileTransfer.upload(file, `${URL}/upload`, options)
      .then((data) => {
        // success
        console.log(data.response);


      }, (err) => {
        // error
        console.error(err);

      })
  }
  async getPermission(url: string) {
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(async status => {
        if (status.hasPermission) {
          await this.download(url);
        }
        else {
          await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(async status => {
              if (status.hasPermission) {
                await this.download(url);
              }
            });
        }
      });
  }

  async download(url: string) {
    this.userService.cargarToken();
    const token = this.userService.token;
    const options = {
      headers: { 'x-token': token }
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    url = (URL + url).replace(/ /g, '%20');


    await fileTransfer.download(url, this.file.externalRootDirectory + 'Download/' + url.substr(url.lastIndexOf("=") + 13), false, options).then(async (entry) => {
      console.log('download complete: ' + entry.toURL());
      await this.openFile(entry.toURL());
    }, (error) => {
      // handle error
      console.error(error);

    });
  }

  async openFile(file: string) {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();


    file = file.replace(/ /g, '%20');

    window.PreviewAnyFile.previewPath(win => {
      if (win == "SUCCESS") {
        console.log('success');
      } else if (win == "CLOSING") {
        console.log('closing')
      } else if (win == "NO_APP") {
        console.log('no suitable app to open the file (mainly will appear on android')
      } else {
        console.log('error')
      }
      loading.dismiss();

    },
      error => console.error("open failed", error),
      file
    );

  }

  async getHttpHeader() {
    await this.userService.cargarToken();
    const token = this.userService.token;

    const headers = new HttpHeaders({
      'x-token': token
    });

    return headers;

  }

  chooseFile() {
    return new Promise<any>(resolve => {
      this.fileChooser.open().then(file => {

        this.filePath.resolveNativePath(file).then(res => resolve({ androidPath: file, path: res }));

      });
    });
  }


  deleteType(id: number) {
    
    return new Promise<any>(resolve => {
        this.getHttpHeader().then(header => {

        this.http.post(`${URL}/types/delete`, { 'id': id }, { headers: header }).subscribe(res => {

          resolve(res);

        },err => {
          this.uiService.presentAlert("Error al borrar el tipo de notificación", 'Este tipo de notificación contiene una o más notificaciones y no puede ser borrado', "Pruebe a borrar o cambiar la notificación de tipo de notificación.");
          resolve(err);
        });

      });

    });
  }

  editType(id: number, type: any) {
    
    return new Promise<any>(resolve => {
        this.getHttpHeader().then(header => {

        this.http.post(`${URL}/types/edit`, { id: id, values: type }, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }

  toggleActiveType(id: number, value: any) {
    
    return new Promise<any>(resolve => {
        this.getHttpHeader().then(header => {

        this.http.post(`${URL}/types/toggleActive`, { 'id': id, 'value': value }, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }

  deleteGroup(id: number) {
    
    return new Promise<any>(resolve => {
        this.getHttpHeader().then(header => {

        this.http.post(`${URL}/groups/delete`, { 'id': id }, { headers: header }).subscribe(res => {

          resolve(res);

        },err => {
          this.uiService.presentAlert("Error al borrar el grupo", 'Este grupo contiene uno o más usuarios y no puede ser borrado', "Pruebe a borrar o cambiar al usuario del grupo.");
          resolve(err);
        });

      });

    });
  }
  editGroup(id: number, group: any) {
    
    return new Promise<any>(resolve => {
        this.getHttpHeader().then(header => {

        this.http.post(`${URL}/groups/edit`, { id: id, values: group }, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }
  toggleActiveGroup(id: number, value: any) {
    
    return new Promise<any>(resolve => {
        this.getHttpHeader().then(header => {

        this.http.post(`${URL}/groups/toggleActive`, { 'id': id, 'value': value }, { headers: header }).subscribe(res => {

          resolve(res);

        });

      });

    });
  }


}
