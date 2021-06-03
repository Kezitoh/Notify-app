import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  groupForm: FormGroup;

  constructor(private dataService:DataService,
    private uiService:UiService) { }

  ngOnInit() {
    this.groupForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      active: new FormControl()
    });
  }

  async onSubmit() {
    const name = this.groupForm.get('name').value;
    const description = this.groupForm.get('description').value
    const active = this.groupForm.get('active').value;

    const group = {
      name: name,
      description: description,
      is_active: active
    }

    
    const resultado = await this.dataService.createGroup(group);

    if(!resultado) {
      this.uiService.presentAlert('Error','Fallo en la creación de grupo','Parece que hubo un error con la creación del registro, vuelve a intentarlo y comprueba que los datos insertados son correctos.' );
      return false;
    }

    this.groupForm.reset();
    this.uiService.presentToast("Grupo creado correctamente", "success");

  }

}
