import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {

  types: any[] = []
  allButtonDisabled = false;

  constructor(private dataService:DataService,
    public popoverCtrl:PopoverController) { }

  ngOnInit() {
    this.dataService.getTypes().then( types => {
      this.types = types;
    });
  }

  filtrar() {
    this.popoverCtrl.dismiss(this.types);
  }

  selectAll() {
    for(let type of this.types) {
      type.checked = true;
    }
    this.allButtonDisabled = true;
  }

  checked(event) {
    this.types[event.detail.value -1].checked =  event.detail.checked;      

    if(this.isAllCheck()) {
      this.allButtonDisabled = true;
      return;
    }
    this.allButtonDisabled = false;
    
  }

  isAllCheck() {
    for(let type of this.types) {
      if(!type.checked) {
        return false;
      }
    }
    return true;
  }

}
