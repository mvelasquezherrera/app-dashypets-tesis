import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "../service/customer.service";
import { CreateCustomerModelRequest, CustomerModel } from "src/app/module/models/customer/customer-models";
import { UserModel } from "src/app/module/models/user/user-models";
import { UserService } from "../../user/service/user.service";

@Component({
  selector: 'app-add-update-customer-modal',
  templateUrl: './add-update-customer-modal.component.html',
  styleUrls: ['./add-update-customer-modal.component.css']
})
export class AddUpdateCustomerModalComponent implements OnInit {
  loading = false;
  @Input() customer: CustomerModel | null;
  customerForm: FormGroup;
  newCustomer: CreateCustomerModelRequest = new CreateCustomerModelRequest();
  listUser: UserModel[] = []

  constructor(
    private _modalRef: MdbModalRef<AddUpdateCustomerModalComponent>,
    private _formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _toastr: ToastrService,
    private _userService: UserService) {

  }
  ngOnInit(): void {
    this.customerForm = this._formBuilder.group({
      dni: ['', Validators.required],
      nombre1: ['', Validators.required],
      nombre2: [''],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      celular: [''],
      fechaNacimiento: [''],
      correo: ['', Validators.email],
      direccion: [''],
      sexo: ['M'],
      usuario: [''],
    });

    this.getListUser()

    if (this.customer){
      this.customer.fechaNacimiento = this.customer.fechaNacimiento.substring(0, 10);
      if(this.customer.viewCustomer)
        this.customer.sexo = this.customer.sexo === "M" ? "Masculino" : "Femenino";
      this.customerForm.patchValue(this.customer)
    }
  }

  getListUser() {
    this.loading = true
    this._userService.getListUser().subscribe(
      (response) => {
        this.listUser = response.filter(elemet => elemet.estadoUsuario === "A")
        this.listUser = this.listUser.slice().sort((a, b) => a.usuario.localeCompare(b.usuario))
        if (this.customer)
          this.customerForm.patchValue({
            usuario: this.customer.usuario
          });
        else
          this.customerForm.patchValue({
            usuario: this.listUser[0].usuario
          });
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Usuarios")
      }
    );
  }

  regiterCustomer() {
    this.loading = true
    if(this.customerForm.valid){
      this._customerService.postCustomer(this.customerForm.value).subscribe(
        (response) => {
          this.loading = false
          this._toastr.success(response.message, "Registrar Cliente")
          this._modalRef.close();
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Registrar Cliente")
          this._modalRef.close();
        }
      )
    }
  }

  updateCustomer(){
    this.loading = true
    if(this.customerForm.valid){
      if(this.customer){
        this.customer.dni = this.customerForm.value.dni
        this.customer.nombre1 = this.customerForm.value.nombre1
        this.customer.nombre2 = this.customerForm.value.nombre2
        this.customer.apellidoPaterno = this.customerForm.value.apellidoPaterno
        this.customer.apellidoMaterno = this.customerForm.value.apellidoMaterno
        this.customer.celular = this.customerForm.value.celular
        this.customer.fechaNacimiento = this.customerForm.value.fechaNacimiento
        this.customer.correo = this.customerForm.value.correo
        this.customer.direccion = this.customerForm.value.direccion
        this.customer.sexo = this.customerForm.value.sexo
        this._customerService.patchCustomer(this.customer).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar Cliente")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar Cliente")
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
