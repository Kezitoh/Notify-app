import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input("title") titulo: string;
  @Input("filter") filter: boolean = false;
  @Input('filterType') filterType: string = "";
  @Input('add') add: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  open_add() {
    switch (this.titulo) {
      case "Usuarios":
        this.router.navigateByUrl('/create-user', { replaceUrl: true });
        break;
      case "Grupos":
        this.router.navigateByUrl('/create-group', { replaceUrl: true });
        break;
      case "Tipos":
        this.router.navigateByUrl('/create-type', { replaceUrl: true });
        break;
    }

  }

  // TODO: Filtrar, valga la redundancia, las páginas que tendrán la opción a filtro.

}
