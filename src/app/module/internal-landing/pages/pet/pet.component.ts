import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PetModel } from 'src/app/module/models/pet/pet-models';
import { PetService } from './service/pet.service';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateViewPetModalComponent } from './add-update-view-pet-modal/add-update-view-pet-modal.component';
import { ActivateDeactivatePetModalComponent } from './activate-deactivate-pet-modal/activate-deactivate-pet-modal.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  loading = false;
  listPet: PetModel[] = []
  selectPet: PetModel | null
  addPet = false
  viewPet = false
  editPet = false
  modalRef: MdbModalRef<AddUpdateViewPetModalComponent>;
  activateDeactivateModalRef: MdbModalRef<ActivateDeactivatePetModalComponent>;

  constructor(private _modalService: MdbModalService, private _petService: PetService, private _toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getListPet()
  }

  getListPet() {
    this.loading = true
    this._petService.getListPet().subscribe(
      (response) => {
        this.listPet = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de mascotas")
      }
    );
  }

  addViewEditPetModal(pet: PetModel | null, addPet: boolean, viewPet: boolean, editPet: boolean) {
    this.selectPet = pet
    if (this.selectPet != undefined) {
      this.selectPet.addPet = addPet
      this.selectPet.editPet = editPet
      this.selectPet.viewPet = viewPet
    }

    this.modalRef = this._modalService.open(AddUpdateViewPetModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.pet = this.selectPet

    this.modalRef.onClose.subscribe(() => {
      this.getListPet()
    });

  }

  activateDeactivateModal(pet: PetModel){
    this.selectPet = pet
    if(this.selectPet.estadoMascota === "A") {
      this.selectPet.activatePet = true
      this.selectPet.deactivatePet = false
    }
    if(this.selectPet.estadoMascota === "I") {
      this.selectPet.deactivatePet = true
      this.selectPet.activatePet = false
    }
    this.activateDeactivateModalRef = this._modalService.open(ActivateDeactivatePetModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateModalRef.component.pet = this.selectPet

    this.activateDeactivateModalRef.onClose.subscribe(() => {
    });
  }

}
