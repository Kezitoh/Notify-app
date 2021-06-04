import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';
import { UsersPage } from '../../pages/users/users.page';
import { TypesPage } from '../../pages/types/types.page';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.page.html',
  styleUrls: ['./edit-type.page.scss'],
})
export class EditTypePage implements OnInit {

  @Input('type') type;

  edit_typeForm: FormGroup;

  constructor(private modalCtrl: ModalController,
    private dataService: DataService, private uiService:UiService,
    private typesPage:TypesPage) { }

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

  async onSubmit() {
    const name = this.edit_typeForm.get('name').value;
    const description = this.edit_typeForm.get('description').value
    let active = this.edit_typeForm.get('active').value;
    if(!active) {
      active = 0;
    }else {
      active = 1
    }

    const type = {
      name: name,
      description: description,
      is_active: active
    }

    await this.dataService.editType(this.type.id, type).then(() => {

      this.typesPage.actualizarLista();
    });

    this.uiService.presentToast("Tipo editado correctamente", "success");

    this.dismiss();
  }

}
