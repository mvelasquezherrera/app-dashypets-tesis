import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AppRoleModel } from 'src/app/module/models/app-role/app-role-models';
import { ActivateDeactivateAppRoleModalComponent } from './activate-deactivate-app-role-modal/activate-deactivate-app-role-modal.component';
import { AddUpdateViewAppRoleModalComponent } from './add-update-view-app-role-modal/add-update-view-app-role-modal.component';
import { AppRoleService } from './service/app-role.service';

@Component({
  selector: 'app-app-role',
  templateUrl: './app-role.component.html',
  styleUrls: ['./app-role.component.css']
})
export class AppRoleComponent implements OnInit {
  loading = false;
  listAppRole: AppRoleModel[] = []
  selectAppRole: AppRoleModel | null
  addAppRole = false
  viewAppRole = false
  editAppRole = false
  modalRef: MdbModalRef<AddUpdateViewAppRoleModalComponent>;
  activateDeactivateAppRole: MdbModalRef<ActivateDeactivateAppRoleModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _appRoleService: AppRoleService) {

  }

  ngOnInit(): void {
    this.getListAppRole()
  }

  getListAppRole() {
    this.loading = true
    this._appRoleService.getListAppRole().subscribe(
      (response) => {
        this.listAppRole = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Roles")
      }
    );
  }

  openModal(AppRole: AppRoleModel | null, addAppRole: boolean, viewAppRole: boolean, editAppRole: boolean) {
    this.selectAppRole = AppRole
    if(this.selectAppRole != undefined){
      this.selectAppRole.addAppRole = addAppRole
      this.selectAppRole.editAppRole = editAppRole
      this.selectAppRole.viewAppRole = viewAppRole
    }

    this.modalRef = this._modalService.open(AddUpdateViewAppRoleModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.appRole = this.selectAppRole

    this.modalRef.onClose.subscribe(() => {
      this.getListAppRole()
    });

  }

  activateDeactivateModal(appRole: AppRoleModel){
    this.selectAppRole = appRole
    if(this.selectAppRole.estadoRolApp === "A") {
      this.selectAppRole.activateAppRole = true
      this.selectAppRole.deactivateAppRole = false
    }
    if(this.selectAppRole.estadoRolApp === "I") {
      this.selectAppRole.deactivateAppRole = true
      this.selectAppRole.activateAppRole = false
    }
    this.activateDeactivateAppRole = this._modalService.open(ActivateDeactivateAppRoleModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateAppRole.component.appRole = this.selectAppRole

    this.activateDeactivateAppRole.onClose.subscribe(() => {
    });
  }

}
