import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {

  @Input('filterType') filterType: string = "";

  @Input('fecha') fecha: any = "desc";

  @Output('data') outputData: any;

  data: any[] = []
  allButtonDisabled = false;
  
  constructor(private dataService:DataService,
    public popoverCtrl:PopoverController) { }

  ngOnInit() {

    if(this.filterType == "" || this.filterType == "admin") {
      this.dataService.getTypes().then( types => {
        this.data = types;
      });
    }else {

    }
  }

  filtrar() {
    this.popoverCtrl.dismiss(this.data);
  }

  selectAll() {
    for(let item of this.data) {
      item.checked = true;
    }
    this.allButtonDisabled = true;
  }

  checked(event) {
    this.data[event.detail.value -1].checked =  event.detail.checked;      

    if(this.isAllCheck()) {
      this.allButtonDisabled = true;
      return;
    }
    this.allButtonDisabled = false;
    
  }

  isAllCheck() {
    for(let item of this.data) {
      if(!item.checked) {
        return false;
      }
    }
    return true;
  }

}
