import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AppRoleModel } from 'src/app/module/models/app-role/app-role-models';
import { UserRoleAppModel, CreateUserRoleAppModelRequest } from 'src/app/module/models/user-role-app/user-role-app-models';
import { UserModel } from 'src/app/module/models/user/user-models';
import { AppRoleService } from '../../app-role/service/app-role.service';
import { UserService } from '../../user/service/user.service';
import { UserRoleAppService } from '../service/user-role-app.service';

@Component({
  selector: 'app-add-update-view-user-role-app-modal',
  templateUrl: './add-update-view-user-role-app-modal.component.html',
  styleUrls: ['./add-update-view-user-role-app-modal.component.css']
})
export class AddUpdateViewUserRoleAppModalComponent implements OnInit {
  loading = false;
  @Input() userRoleApp: UserRoleAppModel | null;
  userRoleAppForm: FormGroup;
  addUserRoleApp: CreateUserRoleAppModelRequest = new CreateUserRoleAppModelRequest()
  listAppRole: AppRoleModel[] = []
  listUser: UserModel[] = []

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewUserRoleAppModalComponent>,
    private _formBuilder: FormBuilder,
    private _userRoleAppService: UserRoleAppService,
    private _toastr: ToastrService,
    private _appRole: AppRoleService,
    private _user: UserService) {

  }

  ngOnInit(): void {
    this.userRoleAppForm = this._formBuilder.group({
      idRolApp: ['', Validators.required],
      usuario: ['', Validators.required]
    });

    this.getListRole()
    this.getListUser()

    if (this.userRoleApp) {
      this.userRoleAppForm.patchValue(this.userRoleApp)
    }
  }

  getListRole() {
    this.loading = true
    this._appRole.getListAppRole().subscribe(
      (response) => {
        this.listAppRole = response.filter(elemet => elemet.estadoRolApp === "A")
        this.listAppRole = this.listAppRole.slice().sort((a, b) => a.descripcionRolApp.localeCompare(b.descripcionRolApp))
        if(this.userRoleApp)
          this.userRoleAppForm.patchValue({
            idRolApp: this.userRoleApp.idRolApp
          });
        else
          this.userRoleAppForm.patchValue({
            idRolApp: this.listAppRole[0].idRolApp
          });
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de roles")
      }
    );
  }

  getListUser() {
    this.loading = true
    this._user.getListUser().subscribe(
      (response) => {
        this.listUser = response.filter(elemet => elemet.estadoUsuario === "A")
        this.listUser = this.listUser.slice().sort((a, b) => a.usuario.localeCompare(b.usuario))
        if(this.userRoleApp)
          this.userRoleAppForm.patchValue({
            usuario: this.userRoleApp.usuario
          });
        else
          this.userRoleAppForm.patchValue({
            usuario: this.listUser[0].usuario
          });
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de usuarios")
      }
    );
  }

  submitUserRoleApp() {
    this.loading = true
    if (this.userRoleAppForm.valid) {
      this.addUserRoleApp = this.userRoleAppForm.value
      this._userRoleAppService.postUserRoleApp(this.addUserRoleApp).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar usuario y rol")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar usuario y rol")
        }
      )
    }
  }

  updateUserRoleApp() {
    this.loading = true
    if (this.userRoleAppForm.valid) {
      if (this.userRoleApp) {
        this.userRoleApp.idRolAppUpdate = this.userRoleAppForm.value.idRolApp;
        this.userRoleApp.usuarioUpdate = this.userRoleAppForm.value.usuario;
        this._userRoleAppService.patchUserRoleApp(this.userRoleApp).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar usuario y rol")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar usuario y rol")
            this._modalRef.close();
          }
        )
      }
    }
  }


  closeModal() {
    this._modalRef.close();
  }

}
