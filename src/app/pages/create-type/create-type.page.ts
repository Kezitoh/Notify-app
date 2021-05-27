import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.page.html',
  styleUrls: ['./create-type.page.scss'],
})
export class CreateTypePage implements OnInit {

  typeForm: FormGroup;

  constructor(private dataService:DataService,
    private uiService:UiService) { }

  ngOnInit() {

    this.typeForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      active: new FormControl()
    });

  }

  onSubmit() {

    const name = this.typeForm.get('name').value;
    const description = this.typeForm.get('description').value
    const active = this.typeForm.get('active').value;

    const type = {
      name: name,
      description: description,
      active: active
    }

    this.dataService.createType(type);

    this.typeForm.reset();
    this.uiService.presentToast("Tipo creado correctamente", "success");
  }

}
