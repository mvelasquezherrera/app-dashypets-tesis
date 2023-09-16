import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../service/user.service";
import { UserModel } from "src/app/module/models/user/user-models";

@Component({
  selector: 'app-activate-deactivate-user-modal',
  templateUrl: './activate-deactivate-user-modal.component.html',
  styleUrls: ['./activate-deactivate-user-modal.component.css']
})
export class ActivateDeactivateUserModalComponent implements OnInit {
  loading = false;
  @Input() user: UserModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateUserModalComponent>,
    private _userService: UserService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivateUser() {
    this.loading = true
    if(this.user){
      if(this.user.activateUser){
        this.user.estadoUsuario = "I"
        this._userService.patchUser(this.user).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Usuario")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Usuario")
            this._modalRef.close();
          }
        )
      }else{
        this.user.estadoUsuario = "A"
        this._userService.patchUser(this.user).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Usuario")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Usuario")
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
