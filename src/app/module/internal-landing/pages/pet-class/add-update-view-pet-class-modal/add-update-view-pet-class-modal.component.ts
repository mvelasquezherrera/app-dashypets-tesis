import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CreatePetClassModelRequest, PetClassModel } from 'src/app/module/models/pet-class/pet-class-models';
import { PetClassService } from '../service/pet-class.service';

@Component({
  selector: 'app-add-update-view-pet-class-modal',
  templateUrl: './add-update-view-pet-class-modal.component.html',
  styleUrls: ['./add-update-view-pet-class-modal.component.css']
})
export class AddUpdateViewPetClassModalComponent implements OnInit {
  loading = false;
  @Input() petClass: PetClassModel | null;
  petClassForm: FormGroup;
  addPetClass: CreatePetClassModelRequest = new CreatePetClassModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewPetClassModalComponent>,
    private _formBuilder: FormBuilder,
    private _petClassService: PetClassService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.petClassForm = this._formBuilder.group({
      descripcionClaseMascota: ['', Validators.required],
    });
    if (this.petClass) {
      this.petClassForm.patchValue(this.petClass)
    }
  }

  submitPetClass() {
    this.loading = true
    if (this.petClassForm.valid) {
      this.addPetClass = this.petClassForm.value
      this._petClassService.postPetClass(this.addPetClass).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar tamaño de perro")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar tamaño de perro")
        }
      )
    }
  }

  updatePetClass() {
    this.loading = true
    if (this.petClassForm.valid) {
      if (this.petClass) {
        this.petClass.descripcionClaseMascota = this.petClassForm.value.descripcionClaseMascota;
        this._petClassService.patchPetClass(this.petClass).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar tamaño de perro")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar tamaño de perro")
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
