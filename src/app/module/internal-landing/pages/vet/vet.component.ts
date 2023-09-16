import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VetModel } from 'src/app/module/models/vet/vet-models';
import { VetService } from './service/vet.service';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateVetModalComponent } from './add-update-view-vet-modal/add-update-view-vet-modal.component';
import { ActivateDeactivateVetModalComponent } from './activate-deactivate-vet-modal/activate-deactivate-vet-modal.component';

@Component({
  selector: 'app-vet',
  templateUrl: './vet.component.html',
  styleUrls: ['./vet.component.css']
})
export class VetComponent implements OnInit {
  loading = false;
  listVet: VetModel[] = []
  selectVet: VetModel | null
  addVet = false
  viewVet = false
  editVet = false
  modalRef: MdbModalRef<AddUpdateVetModalComponent>;
  activateDeactivateModalRef: MdbModalRef<ActivateDeactivateVetModalComponent>;

  constructor(private _modalService: MdbModalService, private _vetService: VetService, private _toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getListVet()
  }

  getListVet() {
    this.loading = true
    this._vetService.getListVet().subscribe(
      (response) => {
        this.listVet = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de veterinarios")
      }
    );
  }

  addViewEditVetModal(vet: VetModel | null, addVet: boolean, viewVet: boolean, editVet: boolean) {
    this.selectVet = vet
    if (this.selectVet != undefined) {
      this.selectVet.addVet = addVet
      this.selectVet.editVet = editVet
      this.selectVet.viewVet = viewVet
    }

    this.modalRef = this._modalService.open(AddUpdateVetModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.vet = this.selectVet

    this.modalRef.onClose.subscribe(() => {
      this.getListVet()
    });

  }

  activateDeactivateModal(vet: VetModel){
    this.selectVet = vet
    if(this.selectVet.estadoVeterinario === "A"){
      this.selectVet.activateVet = true
      this.selectVet.deactivateVet = false
    }
    if(this.selectVet.estadoVeterinario === "I"){
      this.selectVet.activateVet = false
      this.selectVet.deactivateVet = true
    }
    this.activateDeactivateModalRef = this._modalService.open(ActivateDeactivateVetModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateModalRef.component.vet = vet

    this.activateDeactivateModalRef.onClose.subscribe(() => {
    });
  }

}
