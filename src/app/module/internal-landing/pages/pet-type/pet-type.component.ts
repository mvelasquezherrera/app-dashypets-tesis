import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { PetTypeModel } from 'src/app/module/models/pet-type/pet-type-models';
import { ActivateDeactivatePetTypeModalComponent } from './activate-deactivate-pet-type-modal/activate-deactivate-pet-type-modal.component';
import { AddUpdateViewPetTypeModalComponent } from './add-update-view-pet-type-modal/add-update-view-pet-type-modal.component';
import { PetTypeService } from './service/pet-type.service';

@Component({
  selector: 'app-pet-type',
  templateUrl: './pet-type.component.html',
  styleUrls: ['./pet-type.component.css']
})
export class PetTypeComponent implements OnInit {
  loading = false;
  listPetType: PetTypeModel[] = []
  selectPetType: PetTypeModel | null
  addPetType = false
  viewPetType = false
  editPetType = false
  modalRef: MdbModalRef<AddUpdateViewPetTypeModalComponent>;
  activateDeactivatePetType: MdbModalRef<ActivateDeactivatePetTypeModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _petTypeService: PetTypeService) {

  }

  ngOnInit(): void {
    this.getListPetType()
  }

  getListPetType() {
    this.loading = true
    this._petTypeService.getListPetType().subscribe(
      (response) => {
        this.listPetType = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Enfermedades")
      }
    );
  }

  openModal(PetType: PetTypeModel | null, addPetType: boolean, viewPetType: boolean, editPetType: boolean) {
    this.selectPetType = PetType
    if(this.selectPetType != undefined){
      this.selectPetType.addPetType = addPetType
      this.selectPetType.editPetType = editPetType
      this.selectPetType.viewPetType = viewPetType
    }

    this.modalRef = this._modalService.open(AddUpdateViewPetTypeModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.petType = this.selectPetType

    this.modalRef.onClose.subscribe(() => {
      this.getListPetType()
    });

  }

  activateDeactivateModal(petType: PetTypeModel){
    this.selectPetType = petType
    if(this.selectPetType.estadoTipoMascota === "A"){
      this.selectPetType.activatePetType = true
      this.selectPetType.activatePetType = true
    }
    if(this.selectPetType.estadoTipoMascota === "I"){
      this.selectPetType.deactivatePetType = true
      this.selectPetType.activatePetType = false
    }
    this.activateDeactivatePetType = this._modalService.open(ActivateDeactivatePetTypeModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivatePetType.component.petType = petType

    this.activateDeactivatePetType.onClose.subscribe(() => {
    });
  }

}

