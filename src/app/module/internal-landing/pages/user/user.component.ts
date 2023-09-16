import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/module/models/user/user-models';
import { ActivateDeactivateUserModalComponent } from './activate-deactivate-user-modal/activate-deactivate-user-modal.component';
import { AddUpdateViewUserModalComponent } from './add-update-view-user-modal/add-update-view-user-modal.component';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loading = false;
  listUser: UserModel[] = []
  selectUser: UserModel | null
  addUser = false
  viewUser = false
  editUser = false
  modalRef: MdbModalRef<AddUpdateViewUserModalComponent>;
  activateDeactivateUser: MdbModalRef<ActivateDeactivateUserModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _userService: UserService) {

  }

  ngOnInit(): void {
    this.getListUser()
  }

  getListUser() {
    this.loading = true
    this._userService.getListUser().subscribe(
      (response) => {
        this.listUser = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de usuarios")
      }
    );
  }

  openModal(User: UserModel | null, addUser: boolean, viewUser: boolean, editUser: boolean) {
    this.selectUser = User
    if(this.selectUser != undefined){
      this.selectUser.addUser = addUser
      this.selectUser.editUser = editUser
      this.selectUser.viewUser = viewUser
    }

    this.modalRef = this._modalService.open(AddUpdateViewUserModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.user = this.selectUser

    this.modalRef.onClose.subscribe(() => {
      this.getListUser()
    });

  }

  activateDeactivateModal(user: UserModel){
    this.selectUser = user
    if(this.selectUser.estadoUsuario === "A") {
      this.selectUser.activateUser = true
      this.selectUser.deactivateUser = false
    }
    if(this.selectUser.estadoUsuario === "I") {
      this.selectUser.deactivateUser = true
      this.selectUser.activateUser = false
    }
    this.activateDeactivateUser = this._modalService.open(ActivateDeactivateUserModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateUser.component.user = this.selectUser

    this.activateDeactivateUser.onClose.subscribe(() => {
    });
  }

}
