import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UiService } from '../../services/ui.service';
import { GroupsPage } from '../../pages/groups/groups.page';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss'],
})
export class EditGroupPage implements OnInit {

  @Input('group') group;

  edit_groupForm: FormGroup;

  constructor(private modalCtrl: ModalController,
    private dataService: DataService, private uiService:UiService,
    private groupsPage:GroupsPage) { }

  ngOnInit() {
    this.edit_groupForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      active: new FormControl()
    });
  }

  dismiss() {
    this.modalCtrl.dismiss(false);
  }

  async onSubmit() {

    const name = this.edit_groupForm.get('name').value;
    const description = this.edit_groupForm.get('description').value
    let active = this.edit_groupForm.get('active').value;
    if(!active) {
      active = 0;
    }else {
      active = 1
    }

    const group = {
      name: name,
      description: description,
      is_active: active
    }

    await this.dataService.editGroup(this.group.id, group).then(() => {

      this.groupsPage.actualizarLista();
    });

    this.uiService.presentToast("Grupo editado correctamente", "success");

    this.dismiss();
  }

}
