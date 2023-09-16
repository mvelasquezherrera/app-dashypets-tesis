import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { RoleAppPermissionModel } from 'src/app/module/models/role-app-permission/role-app-permission-models';
import { ActivateDeactivateRoleAppPermissionModalComponent } from './activate-deactivate-app-role-permission-modal/activate-deactivate-app-role-permission-modal.component';
import { AddUpdateViewRoleAppPermissionModalComponent } from './add-update-view-app-role-permission-modal/add-update-view-app-role-permission-modal.component';
import { RoleAppPermissionService } from './service/role-app-permission.service';

@Component({
  selector: 'app-role-app-permission',
  templateUrl: './role-app-permission.component.html',
  styleUrls: ['./role-app-permission.component.css']
})
export class RoleAppPermissionComponent implements OnInit {
  loading = false;
  listRoleAppPermission: RoleAppPermissionModel[] = []
  selectRoleAppPermission: RoleAppPermissionModel | null
  addRoleAppPermission = false
  viewRoleAppPermission = false
  editRoleAppPermission = false
  modalRef: MdbModalRef<AddUpdateViewRoleAppPermissionModalComponent>;
  activateDeactivateRoleAppPermission: MdbModalRef<ActivateDeactivateRoleAppPermissionModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _roleAppPermissionService: RoleAppPermissionService) {

  }

  ngOnInit(): void {
    this.getListRoleAppPermission()
  }

  getListRoleAppPermission() {
    this.loading = true
    this._roleAppPermissionService.getListRoleAppPermission().subscribe(
      (response) => {
        this.listRoleAppPermission = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de roles y permisos")
      }
    );
  }

  openModal(RoleAppPermission: RoleAppPermissionModel | null, addRoleAppPermission: boolean, viewRoleAppPermission: boolean, editRoleAppPermission: boolean) {
    this.selectRoleAppPermission = RoleAppPermission
    if(this.selectRoleAppPermission != undefined){
      this.selectRoleAppPermission.addRoleAppPermission = addRoleAppPermission
      this.selectRoleAppPermission.editRoleAppPermission = editRoleAppPermission
      this.selectRoleAppPermission.viewRoleAppPermission = viewRoleAppPermission
    }

    this.modalRef = this._modalService.open(AddUpdateViewRoleAppPermissionModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.roleAppPermission = this.selectRoleAppPermission

    this.modalRef.onClose.subscribe(() => {
      this.getListRoleAppPermission()
    });

  }

  activateDeactivateModal(roleAppPermission: RoleAppPermissionModel){
    this.selectRoleAppPermission = roleAppPermission
    if(this.selectRoleAppPermission.estadoRolPermisoApp === "A") {
      this.selectRoleAppPermission.activateRoleAppPermission = true
      this.selectRoleAppPermission.deactivateRoleAppPermission = false
    }
    if(this.selectRoleAppPermission.estadoRolPermisoApp === "I") {
      this.selectRoleAppPermission.deactivateRoleAppPermission = true
      this.selectRoleAppPermission.activateRoleAppPermission = false
    }
    this.activateDeactivateRoleAppPermission = this._modalService.open(ActivateDeactivateRoleAppPermissionModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateRoleAppPermission.component.roleAppPermission = this.selectRoleAppPermission

    this.activateDeactivateRoleAppPermission.onClose.subscribe(() => {
    });
  }

}
