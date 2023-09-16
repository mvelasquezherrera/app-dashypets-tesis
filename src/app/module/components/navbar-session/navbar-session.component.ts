import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-session',
  templateUrl: './navbar-session.component.html',
  styleUrls: ['./navbar-session.component.css']
})
export class NavbarSessionComponent {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();


  constructor(private _loginService: LoginService, private _router: Router) {}

  toggleMenu() {
    this.toggleSideBarForMe.emit();
  }

  logout() {
    this._loginService.removeSession();
    localStorage.clear();
    this._router.navigateByUrl('/landing/start');
  }
}
