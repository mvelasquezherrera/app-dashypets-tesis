import { Component, Input, OnInit } from "@angular/core";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { UserRoleAppModel } from "src/app/module/models/user-role-app/user-role-app-models";
import { UserRoleAppService } from "../service/user-role-app.service";

@Component({
  selector: 'app-activate-deactivate-user-role-app-modal',
  templateUrl: './activate-deactivate-user-role-app-modal.component.html',
  styleUrls: ['./activate-deactivate-user-role-app-modal.component.css']
})
export class ActivateDeactivateUserRoleAppModalComponent implements OnInit {
  loading = false;
  @Input() userRoleApp: UserRoleAppModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateUserRoleAppModalComponent>,
    private _userRoleAppService: UserRoleAppService,
    private _toastr: ToastrService
    ) {

  }
  ngOnInit(): void {

  }

  activateDeactivateUserRoleApp() {
    this.loading = true
    if (this.userRoleApp) {
      if (this.userRoleApp.activateUserRoleApp) {
        this.userRoleApp.estadoUsuarioRolApp = "I"
        this.userRoleApp.idRolAppUpdate = this.userRoleApp.idRolApp
        this.userRoleApp.usuarioUpdate = this.userRoleApp.usuario
        this._userRoleAppService.patchUserRoleApp(this.userRoleApp).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar usuario y rol")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar usuario y rol")
            this._modalRef.close();
          }
        )
      } else {
        this.userRoleApp.estadoUsuarioRolApp = "A"
        this.userRoleApp.idRolAppUpdate = this.userRoleApp.idRolApp
        this.userRoleApp.usuarioUpdate = this.userRoleApp.usuario
        this._userRoleAppService.patchUserRoleApp(this.userRoleApp).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar usuario y rol")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar usuario y rol")
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
