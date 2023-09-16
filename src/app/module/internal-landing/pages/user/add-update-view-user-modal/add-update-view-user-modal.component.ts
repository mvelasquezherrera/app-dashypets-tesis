import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { CreateUserModelRequest, UserModel } from 'src/app/module/models/user/user-models';

@Component({
  selector: 'app-add-update-view-user-modal',
  templateUrl: './add-update-view-user-modal.component.html',
  styleUrls: ['./add-update-view-user-modal.component.css']
})
export class AddUpdateViewUserModalComponent implements OnInit {
  loading = false;
  @Input() user: UserModel | null;
  userForm: FormGroup;
  addUser: CreateUserModelRequest = new CreateUserModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewUserModalComponent>,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });
    if (this.user) {
      this.userForm.patchValue(this.user)
    }
  }

  submitUser() {
    this.loading = true
    if (this.userForm.valid) {
      this.addUser = this.userForm.value
      this._userService.postUser(this.addUser).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar Usuario")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar Usuario")
        }
      )
    }
  }

  updateUser() {
    this.loading = true
    if (this.userForm.valid) {
      if (this.user) {
        this.user.clave = this.userForm.value.clave;
        this.user.usuarioUpdate = this.userForm.value.usuario;
        this._userService.patchUser(this.user).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar usuario")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar usuario")
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
