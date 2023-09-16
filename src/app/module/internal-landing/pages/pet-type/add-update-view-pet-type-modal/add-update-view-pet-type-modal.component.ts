import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CreatePetTypeModelRequest, PetTypeModel } from 'src/app/module/models/pet-type/pet-type-models';
import { PetTypeService } from '../service/pet-type.service';

@Component({
  selector: 'app-add-update-view-pet-type-modal',
  templateUrl: './add-update-view-pet-type-modal.component.html',
  styleUrls: ['./add-update-view-pet-type-modal.component.css']
})
export class AddUpdateViewPetTypeModalComponent implements OnInit {
  loading = false;
  @Input() petType: PetTypeModel | null;
  petTypeForm: FormGroup;
  addPetType: CreatePetTypeModelRequest = new CreatePetTypeModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewPetTypeModalComponent>,
    private _formBuilder: FormBuilder,
    private _petTypeService: PetTypeService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.petTypeForm = this._formBuilder.group({
      descripcionTipoMascota: ['', Validators.required],
    });
    if (this.petType) {
      this.petTypeForm.patchValue(this.petType)
    }
  }

  submitPetType() {
    this.loading = true
    if (this.petTypeForm.valid) {
      this.addPetType = this.petTypeForm.value
      this._petTypeService.postPetType(this.addPetType).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar raza de perro")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar raza de perro")
        }
      )
    }
  }

  updatePetType() {
    this.loading = true
    if (this.petTypeForm.valid) {
      if (this.petType) {
        this.petType.descripcionTipoMascota = this.petTypeForm.value.descripcionTipoMascota;
        this._petTypeService.patchPetType(this.petType).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar raza de perro")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar raza de perro")
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
