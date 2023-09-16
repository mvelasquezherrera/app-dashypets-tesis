import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AppPermissionModel } from 'src/app/module/models/app-permission/app-permission-models';
import { AppRoleModel } from 'src/app/module/models/app-role/app-role-models';
import { CreateRoleAppPermissionModelRequest, RoleAppPermissionModel } from 'src/app/module/models/role-app-permission/role-app-permission-models';
import { AppPermissionService } from '../../app-permission/service/app-permission.service';
import { AppRoleService } from '../../app-role/service/app-role.service';
import { RoleAppPermissionService } from '../service/role-app-permission.service';

@Component({
  selector: 'app-add-update-view-app-role-permission-modal',
  templateUrl: './add-update-view-app-role-permission-modal.component.html',
  styleUrls: ['./add-update-view-app-role-permission-modal.component.css']
})
export class AddUpdateViewRoleAppPermissionModalComponent implements OnInit {
  loading = false;
  @Input() roleAppPermission: RoleAppPermissionModel | null;
  roleAppPermissionForm: FormGroup;
  addRoleAppPermission: CreateRoleAppPermissionModelRequest = new CreateRoleAppPermissionModelRequest()
  listAppRole: AppRoleModel[] = []
  listAppPermission: AppPermissionModel[] = []

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewRoleAppPermissionModalComponent>,
    private _formBuilder: FormBuilder,
    private _roleAppPermissionService: RoleAppPermissionService,
    private _toastr: ToastrService,
    private _appRole: AppRoleService,
    private _appPermission: AppPermissionService) {

  }

  ngOnInit(): void {
    this.roleAppPermissionForm = this._formBuilder.group({
      idRolApp: ['', Validators.required],
      idPermisoApp: ['', Validators.required]
    });

    this.getListRole()
    this.getListPermission()

    if (this.roleAppPermission) {
      this.roleAppPermissionForm.patchValue(this.roleAppPermission)
    }
  }

  getListRole() {
    this.loading = true
    this._appRole.getListAppRole().subscribe(
      (response) => {
        this.listAppRole = response.filter(elemet => elemet.estadoRolApp === "A")
        this.listAppRole = this.listAppRole.slice().sort((a, b) => a.descripcionRolApp.localeCompare(b.descripcionRolApp))
        if(this.roleAppPermission)
          this.roleAppPermissionForm.patchValue({
            idRolApp: this.roleAppPermission.idRolApp
          });
        else
          this.roleAppPermissionForm.patchValue({
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

  getListPermission() {
    this.loading = true
    this._appPermission.getListAppPermission().subscribe(
      (response) => {
        this.listAppPermission = response.filter(elemet => elemet.estadoPermisoApp === "A")
        this.listAppPermission = this.listAppPermission.slice().sort((a, b) => a.descripcionPermisoApp.localeCompare(b.descripcionPermisoApp))
        if(this.roleAppPermission)
          this.roleAppPermissionForm.patchValue({
            idPermisoApp: this.roleAppPermission.idPermisoApp
          });
        else
          this.roleAppPermissionForm.patchValue({
            idPermisoApp: this.listAppPermission[0].idPermisoApp
          });
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de permisos")
      }
    );
  }

  submitRoleAppPermission() {
    this.loading = true
    if (this.roleAppPermissionForm.valid) {
      this.addRoleAppPermission = this.roleAppPermissionForm.value
      this._roleAppPermissionService.postRoleAppPermission(this.addRoleAppPermission).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar rol y permiso")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar rol y permiso")
        }
      )
    }
  }

  updateRoleAppPermission() {
    this.loading = true
    if (this.roleAppPermissionForm.valid) {
      if (this.roleAppPermission) {
        this.roleAppPermission.idRolAppUpdate = this.roleAppPermissionForm.value.idRolApp;
        this.roleAppPermission.idPermisoAppUpdate = this.roleAppPermissionForm.value.idPermisoApp;
        this._roleAppPermissionService.patchRoleAppPermission(this.roleAppPermission).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar rol y permiso")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar rol y permiso")
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
