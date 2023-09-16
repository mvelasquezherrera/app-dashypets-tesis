import { Component, Input, OnInit } from "@angular/core";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { AppRoleModel } from "src/app/module/models/app-role/app-role-models";
import { AppRoleService } from "../service/app-role.service";

@Component({
  selector: 'app-activate-deactivate-app-role-modal',
  templateUrl: './activate-deactivate-app-role-modal.component.html',
  styleUrls: ['./activate-deactivate-app-role-modal.component.css']
})
export class ActivateDeactivateAppRoleModalComponent implements OnInit {
  loading = false;
  @Input() appRole: AppRoleModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateAppRoleModalComponent>,
    private _appRoleService: AppRoleService,
    private _toastr: ToastrService
    ) {

  }
  ngOnInit(): void {

  }

  activateDeactivateAppRole() {
    this.loading = true
    if (this.appRole) {
      if (this.appRole.activateAppRole) {
        this.appRole.estadoRolApp = "I"
        this._appRoleService.patchAppRole(this.appRole).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Rol")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Rol")
            this._modalRef.close();
          }
        )
      } else {
        this.appRole.estadoRolApp = "A"
        this._appRoleService.patchAppRole(this.appRole).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Rol")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Rol")
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
