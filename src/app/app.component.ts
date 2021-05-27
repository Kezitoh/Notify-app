import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User, Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { PushService } from './services/push.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  
  
  usuario:User;

  appPages: Observable<Componente[]>;
  adminPages: Observable<Componente[]>;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  
  constructor(private userService:UserService,
    private dataService:DataService, 
    private pushService: PushService,
    private menuController: MenuController) {

      this.pushService.configuracionInicial();
      
    
  }

  ngOnInit() {
    this.userService.usuario$.subscribe( resp => {
      this.usuario = resp;
      if(this.usuario.id_role == '1') {
        this.adminPages = this.dataService.getAdminOpts();
      }else {
        this.adminPages= null;
      }
    });
    
    this.appPages = this.dataService.getMenuOpts();
      
      
  }

  logout() {
    this.menuController.close().then( () => {
      this.userService.logout();
    });
    
  }
  

}
