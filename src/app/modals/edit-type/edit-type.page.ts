import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.page.html',
  styleUrls: ['./edit-type.page.scss'],
})
export class EditTypePage implements OnInit {

  @Input('type') type;

  edit_typeForm: FormGroup;

  constructor(private modalCtrl: ModalController,
    private dataService: DataService, private uiService:UiService) { }

  ngOnInit() {
    this.edit_typeForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      active: new FormControl()
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  onSubmit() {
    const name = this.edit_typeForm.get('name').value;
    const description = this.edit_typeForm.get('description').value
    const active = this.edit_typeForm.get('active').value;

    const type = {
      name: name,
      description: description,
      is_active: active
    }

    this.dataService.editType(this.type.id, type);

    this.uiService.presentToast("Tipo editado correctamente", "success");

    this.dismiss();
  }

}
