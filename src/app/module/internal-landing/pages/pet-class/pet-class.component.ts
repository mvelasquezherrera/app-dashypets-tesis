import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { PetClassModel } from 'src/app/module/models/pet-class/pet-class-models';
import { ActivateDeactivatePetClassModalComponent } from './activate-deactivate-pet-class-modal/activate-deactivate-pet-class-modal.component';
import { AddUpdateViewPetClassModalComponent } from './add-update-view-pet-class-modal/add-update-view-pet-class-modal.component';
import { PetClassService } from './service/pet-class.service';

@Component({
  selector: 'app-pet-class',
  templateUrl: './pet-class.component.html',
  styleUrls: ['./pet-class.component.css']
})
export class PetClassComponent implements OnInit {
  loading = false;
  listPetClass: PetClassModel[] = []
  selectPetClass: PetClassModel | null
  addPetClass = false
  viewPetClass = false
  editPetClass = false
  modalRef: MdbModalRef<AddUpdateViewPetClassModalComponent>;
  activateDeactivatePetClass: MdbModalRef<ActivateDeactivatePetClassModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _petClassService: PetClassService) {

  }

  ngOnInit(): void {
    this.getListPetClass()
  }

  getListPetClass() {
    this.loading = true
    this._petClassService.getListPetClass().subscribe(
      (response) => {
        this.listPetClass = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Enfermedades")
      }
    );
  }

  openModal(PetClass: PetClassModel | null, addPetClass: boolean, viewPetClass: boolean, editPetClass: boolean) {
    this.selectPetClass = PetClass
    if(this.selectPetClass != undefined){
      this.selectPetClass.addPetClass = addPetClass
      this.selectPetClass.editPetClass = editPetClass
      this.selectPetClass.viewPetClass = viewPetClass
    }

    this.modalRef = this._modalService.open(AddUpdateViewPetClassModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.petClass = this.selectPetClass

    this.modalRef.onClose.subscribe(() => {
      this.getListPetClass()
    });

  }

  activateDeactivateModal(petClass: PetClassModel){
    this.selectPetClass = petClass
    if(this.selectPetClass.estadoClaseMascota === "A") {
      this.selectPetClass.activatePetClass = true
      this.selectPetClass.dactivatePetClass = false
    }
    if(this.selectPetClass.estadoClaseMascota === "I"){
      this.selectPetClass.dactivatePetClass = true
      this.selectPetClass.activatePetClass = false
    }
    this.activateDeactivatePetClass = this._modalService.open(ActivateDeactivatePetClassModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivatePetClass.component.petClass = petClass

    this.activateDeactivatePetClass.onClose.subscribe(() => {
    });
  }

}

