import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AppRoleService } from '../service/app-role.service';
import { CreateAppRoleModelRequest, AppRoleModel } from 'src/app/module/models/app-role/app-role-models';

@Component({
  selector: 'app-add-update-view-app-role-modal',
  templateUrl: './add-update-view-app-role-modal.component.html',
  styleUrls: ['./add-update-view-app-role-modal.component.css']
})
export class AddUpdateViewAppRoleModalComponent implements OnInit {
  loading = false;
  @Input() appRole: AppRoleModel | null;
  appRoleForm: FormGroup;
  addAppRole: CreateAppRoleModelRequest = new CreateAppRoleModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewAppRoleModalComponent>,
    private _formBuilder: FormBuilder,
    private _appRoleService: AppRoleService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.appRoleForm = this._formBuilder.group({
      descripcionRolApp: ['', Validators.required],
      abreviacionRolApp: ['', Validators.required]
    });
    if (this.appRole) {
      this.appRoleForm.patchValue(this.appRole)
    }
  }

  submitAppRole() {
    this.loading = true
    if (this.appRoleForm.valid) {
      this.addAppRole = this.appRoleForm.value
      this._appRoleService.postAppRole(this.addAppRole).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar rol")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar rol")
        }
      )
    }
  }

  updateAppRole() {
    this.loading = true
    if (this.appRoleForm.valid) {
      if (this.appRole) {
        this.appRole.descripcionRolApp = this.appRoleForm.value.descripcionRolApp;
        this.appRole.abreviacionRolApp = this.appRoleForm.value.abreviacionRolApp;
        this._appRoleService.patchAppRole(this.appRole).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar rol")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar rol")
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
