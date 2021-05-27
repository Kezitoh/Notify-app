import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  groupForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.groupForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
    });
  }

  onSubmit() {
    const name = this.groupForm.get('name').value;
    const description = this.groupForm.get('description').value

    const group = {
      name: name,
      description: description
    }

    

  }

}
