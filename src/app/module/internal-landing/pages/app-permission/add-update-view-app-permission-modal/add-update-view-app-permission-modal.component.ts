import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AppPermissionService } from '../service/app-permission.service';
import { CreateAppPermissionModelRequest, AppPermissionModel } from 'src/app/module/models/app-permission/app-permission-models';

@Component({
  selector: 'app-add-update-view-app-permission-modal',
  templateUrl: './add-update-view-app-permission-modal.component.html',
  styleUrls: ['./add-update-view-app-permission-modal.component.css']
})
export class AddUpdateViewAppPermissionModalComponent implements OnInit {
  loading = false;
  @Input() appPermission: AppPermissionModel | null;
  appPermissionForm: FormGroup;
  addAppPermission: CreateAppPermissionModelRequest = new CreateAppPermissionModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewAppPermissionModalComponent>,
    private _formBuilder: FormBuilder,
    private _appPermissionService: AppPermissionService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.appPermissionForm = this._formBuilder.group({
      descripcionPermisoApp: ['', Validators.required],
    });
    if (this.appPermission) {
      this.appPermissionForm.patchValue(this.appPermission)
    }
  }

  submitAppPermission() {
    this.loading = true
    if (this.appPermissionForm.valid) {
      this.addAppPermission = this.appPermissionForm.value
      this._appPermissionService.postAppPermission(this.addAppPermission).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar permiso")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar permiso")
        }
      )
    }
  }

  updateAppPermission() {
    this.loading = true
    if (this.appPermissionForm.valid) {
      if (this.appPermission) {
        this.appPermission.descripcionPermisoApp = this.appPermissionForm.value.descripcionPermisoApp;
        this._appPermissionService.patchAppPermission(this.appPermission).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar permiso")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar permiso")
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
