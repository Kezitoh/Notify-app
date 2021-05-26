import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  userForm: FormGroup;
  groups: any[];
  roles: any[];

  constructor(private dataService:DataService, private userService:UserService,
    private uiService: UiService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      role: new FormControl(),
      group: new FormControl(),
      user: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      active: new FormControl(),
    });

    this.dataService.getGroups().then( groups => {
      this.groups = groups;
    });

  }

  onSubmit() {
    const role = this.userForm.get('role').value;
    const group = this.userForm.get('group').value;
    const user = this.userForm.get('user').value;
    const name = this.userForm.get('name').value;
    const surname = this.userForm.get('surname').value;
    const email = this.userForm.get('email').value;
    const active = this.userForm.get('active').value;

    const usuario : User = {
      id_group: this.userForm.get('group').value,
      id_role: this.userForm.get('role').value,
      user: this.userForm.get('user').value,
      name: this.userForm.get('name').value,
      surname: this.userForm.get('surname').value,
      email: this.userForm.get('email').value,
      is_activated: this.userForm.get('active').value
    };

    this.userService.register(usuario);

    this.userForm.reset();
    this.uiService.presentToast("Usuario creado correctamente", "success");

  }



}
