import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  
  @Input('user') user;

  edit_userForm: FormGroup;
  groups: any[];
  group: any;
  role: any;
  compareWith : any ;

  constructor(private modalCtrl: ModalController,
    private userService: UserService, private uiService:UiService,
    private dataService:DataService) { }

  ngOnInit() {
    this.compareWith = this.compareWithFn;
    this.group = this.user.id_group;
    this.role = this.user.id_role;
    this.dataService.getGroups().then( groups => {
      this.groups = groups;
    });

    this.edit_userForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      user: new FormControl(),
      active: new FormControl(),
      role: new FormControl(),
      group: new FormControl()
    });
  }

  compareWithFn(o1, o2) {
    return o1 === o2;
  };

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  onSubmit() {
    const name = this.edit_userForm.get('name').value;
    const user = this.edit_userForm.get('user').value;
    const surname = this.edit_userForm.get('surname').value;
    const email = this.edit_userForm.get('email').value;
    const active = this.edit_userForm.get('active').value;
    const role = this.edit_userForm.get('role').value;
    const group = this.edit_userForm.get('group').value;

    console.log(group);
    

    const userr = {
      name: name,
      email: email,
      surname: surname,
      user: user,
      is_active: active,
      id_role: role,
      id_group: group == null? this.user.id_group : group
    }

    this.userService.editUser(this.user.id, userr);

    this.uiService.presentToast("Usuario editado correctamente", "success");

    this.dismiss();
  }

}
