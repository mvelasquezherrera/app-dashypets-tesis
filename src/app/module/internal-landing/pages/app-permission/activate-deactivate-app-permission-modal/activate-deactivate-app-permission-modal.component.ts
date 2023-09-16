import { Component, Input, OnInit } from "@angular/core";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { AppPermissionModel } from "src/app/module/models/app-permission/app-permission-models";
import { AppPermissionService } from "../service/app-permission.service";

@Component({
  selector: 'app-activate-deactivate-app-permission-modal',
  templateUrl: './activate-deactivate-app-permission-modal.component.html',
  styleUrls: ['./activate-deactivate-app-permission-modal.component.css']
})
export class ActivateDeactivateAppPermissionModalComponent implements OnInit {
  loading = false;
  @Input() appPermission: AppPermissionModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateAppPermissionModalComponent>,
    private _appPermissionService: AppPermissionService,
    private _toastr: ToastrService
    ) {

  }
  ngOnInit(): void {

  }

  activateDeactivateAppPermission() {
    this.loading = true
    if (this.appPermission) {
      if (this.appPermission.activateAppPermission) {
        this.appPermission.estadoPermisoApp = "I"
        this._appPermissionService.patchAppPermission(this.appPermission).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Permiso")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Permiso")
            this._modalRef.close();
          }
        )
      } else {
        this.appPermission.estadoPermisoApp = "A"
        this._appPermissionService.patchAppPermission(this.appPermission).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Permiso")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Permiso")
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
