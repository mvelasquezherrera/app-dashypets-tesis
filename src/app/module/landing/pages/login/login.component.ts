import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModelRequest } from 'src/app/module/models/login/loginModelRequest';
import { MenuOption } from 'src/app/module/models/sidebar/sidebarModelResponse';
import { LoginService } from 'src/app/module/services/login/login.service';
import { SidebarService } from 'src/app/module/services/sidebar/sidebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  showPassword: boolean = false;
  loginForm: FormGroup;

  menuOptionsAll: MenuOption[];
  activeMenuOptions: MenuOption[] = []

  constructor(private _formBuilder: FormBuilder, private _loginService: LoginService, private _router: Router, private _sidebarService: SidebarService, private _toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.loading = true
    if (this.loginForm.valid) {
      this._loginService.login(this.loginForm.value).subscribe(
        (response) => {
          const token = response.token;
          const message = response.message
          const fullName = response.nombreUsuario
          const role = response.rolApp
          if (fullName) localStorage.setItem('fullName', fullName);
          if (role) localStorage.setItem('role', role);
          if (token) {
            localStorage.setItem('token', token);
            this._sidebarService.getMunuOptions().subscribe(
              (response: MenuOption[]) => {
                this.menuOptionsAll = response
                this.menuOptionsAll.forEach(element => {
                  element.routeInApp = element.descripcionPermisoApp.toLowerCase().replace(/\s/g, '')
                  if (element.estadoPermisoApp === "A") this.activeMenuOptions.push(element)
                });
                localStorage.setItem('menu', JSON.stringify(this.activeMenuOptions))
                this._router.navigateByUrl('/internal/consulta');
                this.loading = false;
                this._toastr.success(message, "Inicio de sesión")
              },
              (error) => {
                this.loading = false;
                this._toastr.error(error.message, "Carga de datos")
              }
            )
          }
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Inicio de sesión")
        }
      )
    }
  }
}
