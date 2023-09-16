import { Component, Input, OnInit } from "@angular/core";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { RoleAppPermissionModel } from "src/app/module/models/role-app-permission/role-app-permission-models";
import { RoleAppPermissionService } from "../service/role-app-permission.service";

@Component({
  selector: 'app-activate-deactivate-app-role-permission-modal',
  templateUrl: './activate-deactivate-app-role-permission-modal.component.html',
  styleUrls: ['./activate-deactivate-app-role-permission-modal.component.css']
})
export class ActivateDeactivateRoleAppPermissionModalComponent implements OnInit {
  loading = false;
  @Input() roleAppPermission: RoleAppPermissionModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateRoleAppPermissionModalComponent>,
    private _roleAppPermissionService: RoleAppPermissionService,
    private _toastr: ToastrService
    ) {

  }
  ngOnInit(): void {

  }

  activateDeactivateRoleAppPermission() {
    this.loading = true
    if (this.roleAppPermission) {
      if (this.roleAppPermission.activateRoleAppPermission) {
        this.roleAppPermission.estadoRolPermisoApp = "I"
        this.roleAppPermission.idRolAppUpdate = this.roleAppPermission.idRolApp
        this.roleAppPermission.idPermisoAppUpdate = this.roleAppPermission.idPermisoApp
        this._roleAppPermissionService.patchRoleAppPermission(this.roleAppPermission).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar rol y permiso")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar rol y permiso")
            this._modalRef.close();
          }
        )
      } else {
        this.roleAppPermission.estadoRolPermisoApp = "A"
        this.roleAppPermission.idRolAppUpdate = this.roleAppPermission.idRolApp
        this.roleAppPermission.idPermisoAppUpdate = this.roleAppPermission.idPermisoApp
        this._roleAppPermissionService.patchRoleAppPermission(this.roleAppPermission).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar rol y permiso")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar rol y permiso")
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
