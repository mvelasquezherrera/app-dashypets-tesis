import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AppPermissionModel } from 'src/app/module/models/app-permission/app-permission-models';
import { ActivateDeactivateAppPermissionModalComponent } from './activate-deactivate-app-permission-modal/activate-deactivate-app-permission-modal.component';
import { AddUpdateViewAppPermissionModalComponent } from './add-update-view-app-permission-modal/add-update-view-app-permission-modal.component';
import { AppPermissionService } from './service/app-permission.service';

@Component({
  selector: 'app-app-permission',
  templateUrl: './app-permission.component.html',
  styleUrls: ['./app-permission.component.css']
})
export class AppPermissionComponent implements OnInit {
  loading = false;
  listAppPermission: AppPermissionModel[] = []
  selectAppPermission: AppPermissionModel | null
  addAppPermission = false
  viewAppPermission = false
  editAppPermission = false
  modalRef: MdbModalRef<AddUpdateViewAppPermissionModalComponent>;
  activateDeactivateAppPermission: MdbModalRef<ActivateDeactivateAppPermissionModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _appPermissionService: AppPermissionService) {

  }

  ngOnInit(): void {
    this.getListAppPermission()
  }

  getListAppPermission() {
    this.loading = true
    this._appPermissionService.getListAppPermission().subscribe(
      (response) => {
        this.listAppPermission = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Permisos")
      }
    );
  }

  openModal(AppPermission: AppPermissionModel | null, addAppPermission: boolean, viewAppPermission: boolean, editAppPermission: boolean) {
    this.selectAppPermission = AppPermission
    if(this.selectAppPermission != undefined){
      this.selectAppPermission.addAppPermission = addAppPermission
      this.selectAppPermission.editAppPermission = editAppPermission
      this.selectAppPermission.viewAppPermission = viewAppPermission
    }

    this.modalRef = this._modalService.open(AddUpdateViewAppPermissionModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.appPermission = this.selectAppPermission

    this.modalRef.onClose.subscribe(() => {
      this.getListAppPermission()
    });

  }

  activateDeactivateModal(appPermission: AppPermissionModel){
    this.selectAppPermission = appPermission
    if(this.selectAppPermission.estadoPermisoApp === "A") {
      this.selectAppPermission.activateAppPermission = true
      this.selectAppPermission.deactivateAppPermission = false
    }
    if(this.selectAppPermission.estadoPermisoApp === "I") {
      this.selectAppPermission.deactivateAppPermission = true
      this.selectAppPermission.activateAppPermission = false
    }
    this.activateDeactivateAppPermission = this._modalService.open(ActivateDeactivateAppPermissionModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateAppPermission.component.appPermission = this.selectAppPermission

    this.activateDeactivateAppPermission.onClose.subscribe(() => {
    });
  }

}
