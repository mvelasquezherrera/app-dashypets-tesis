import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { UserRoleAppModel } from 'src/app/module/models/user-role-app/user-role-app-models';
import { ActivateDeactivateUserRoleAppModalComponent } from './activate-deactivate-user-role-app-modal/activate-deactivate-user-role-app-modal.component';
import { AddUpdateViewUserRoleAppModalComponent } from './add-update-view-user-role-app-modal/add-update-view-user-role-app-modal.component';
import { UserRoleAppService } from './service/user-role-app.service';

@Component({
  selector: 'app-user-role-app',
  templateUrl: './user-role-app.component.html',
  styleUrls: ['./user-role-app.component.css']
})
export class UserRoleAppComponent implements OnInit {
  loading = false;
  listUserRoleApp: UserRoleAppModel[] = []
  selectUserRoleApp: UserRoleAppModel | null
  addUserRoleApp = false
  viewUserRoleApp = false
  editUserRoleApp = false
  modalRef: MdbModalRef<AddUpdateViewUserRoleAppModalComponent>;
  activateDeactivateUserRoleApp: MdbModalRef<ActivateDeactivateUserRoleAppModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _userRoleAppService: UserRoleAppService) {

  }

  ngOnInit(): void {
    this.getListUserRoleApp()
  }

  getListUserRoleApp() {
    this.loading = true
    this._userRoleAppService.getListUserRoleApp().subscribe(
      (response) => {
        this.listUserRoleApp = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de roles y permisos")
      }
    );
  }

  openModal(UserRoleApp: UserRoleAppModel | null, addUserRoleApp: boolean, viewUserRoleApp: boolean, editUserRoleApp: boolean) {
    this.selectUserRoleApp = UserRoleApp
    if(this.selectUserRoleApp != undefined){
      this.selectUserRoleApp.addUserRoleApp = addUserRoleApp
      this.selectUserRoleApp.editUserRoleApp = editUserRoleApp
      this.selectUserRoleApp.viewUserRoleApp = viewUserRoleApp
    }

    this.modalRef = this._modalService.open(AddUpdateViewUserRoleAppModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.userRoleApp = this.selectUserRoleApp

    this.modalRef.onClose.subscribe(() => {
      this.getListUserRoleApp()
    });

  }

  activateDeactivateModal(userRoleApp: UserRoleAppModel){
    this.selectUserRoleApp = userRoleApp
    if(this.selectUserRoleApp.estadoUsuarioRolApp === "A") {
      this.selectUserRoleApp.activateUserRoleApp = true
      this.selectUserRoleApp.deactivateUserRoleApp = false
    }
    if(this.selectUserRoleApp.estadoUsuarioRolApp === "I") {
      this.selectUserRoleApp.deactivateUserRoleApp = true
      this.selectUserRoleApp.activateUserRoleApp = false
    }
    this.activateDeactivateUserRoleApp = this._modalService.open(ActivateDeactivateUserRoleAppModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateUserRoleApp.component.userRoleApp = this.selectUserRoleApp

    this.activateDeactivateUserRoleApp.onClose.subscribe(() => {
    });
  }

}
