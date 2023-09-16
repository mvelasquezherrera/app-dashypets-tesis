import { Component } from '@angular/core';

@Component({
  selector: 'app-internal-layout',
  templateUrl: './internal-layout.component.html',
  styleUrls: ['./internal-layout.component.css']
})
export class InternalLayoutComponent {
  isSidebarOpened: boolean;

  constructor() {
    this.isSidebarOpened = true;
  }

  sideBarToggler() {
    this.isSidebarOpened = !this.isSidebarOpened
  }
}
