import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "../service/customer.service";
import { CustomerModel } from "src/app/module/models/customer/customer-models";

@Component({
  selector: 'app-activate-deactivate-customer-modal',
  templateUrl: './activate-deactivate-customer-modal.component.html',
  styleUrls: ['./activate-deactivate-customer-modal.component.css']
})
export class ActivateDeactivateCustomerModalComponent implements OnInit {
  loading = false;
  @Input() customer: CustomerModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateCustomerModalComponent>,
    private _formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivateCustomer() {
    this.loading = true
    if(this.customer){
      if(this.customer.activateCustomer){
        this.customer.estadoCliente = "I"
        this._customerService.patchCustomer(this.customer).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Cliente")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Cliente")
            this._modalRef.close();
          }
        )
      }else{
        this.customer.estadoCliente = "A"
        this._customerService.patchCustomer(this.customer).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Cliente")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Cliente")
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
