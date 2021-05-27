import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.page.html',
  styleUrls: ['./create-type.page.scss'],
})
export class CreateTypePage implements OnInit {

  typeForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.typeForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      active: new FormControl()
    });

  }

  onSubmit() {}

}
