import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ActivateDeactivateCustomerModalComponent } from './activate-deactivate-customer-modal/activate-deactivate-customer-modal.component';
import { AddUpdateCustomerModalComponent } from './add-update-customer-modal/add-update-customer-modal.component';
import { CustomerService } from './service/customer.service';
import { CustomerModel } from 'src/app/module/models/customer/customer-models';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  loading = false;
  listCustomer: CustomerModel[] = []
  selectCustomer: CustomerModel | null
  addCustomer = false
  viewCustomer = false
  editCustomer = false
  modalRef: MdbModalRef<AddUpdateCustomerModalComponent>;
  activateDeactivateModalRef: MdbModalRef<ActivateDeactivateCustomerModalComponent>;

  constructor(private _modalService: MdbModalService, private _customerService: CustomerService, private _toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getListCustomer()
  }

  getListCustomer() {
    this.loading = true
    this._customerService.getListCustomer().subscribe(
      (response) => {
        this.listCustomer = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de clientes")
      }
    );
  }

  addViewEditCustomerModal(customer: CustomerModel | null, addCustomer: boolean, viewCustomer: boolean, editCustomer: boolean) {
    this.selectCustomer = customer
    if (this.selectCustomer != undefined) {
      this.selectCustomer.addCustomer = addCustomer
      this.selectCustomer.editCustomer = editCustomer
      this.selectCustomer.viewCustomer = viewCustomer
    }

    this.modalRef = this._modalService.open(AddUpdateCustomerModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.customer = this.selectCustomer

    this.modalRef.onClose.subscribe(() => {
      this.getListCustomer()
    });

  }

  activateDeactivateModa(customer: CustomerModel){
    this.selectCustomer = customer
    if(this.selectCustomer.estadoCliente === "A") {
      this.selectCustomer.activateCustomer = true
      this.selectCustomer.deactivateCustomer = false
    }
    if(this.selectCustomer.estadoCliente === "I") {
      this.selectCustomer.deactivateCustomer = true
      this.selectCustomer.activateCustomer = false
    }
    this.activateDeactivateModalRef = this._modalService.open(ActivateDeactivateCustomerModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateModalRef.component.customer = this.selectCustomer

    this.activateDeactivateModalRef.onClose.subscribe(() => {
    });
  }

}
