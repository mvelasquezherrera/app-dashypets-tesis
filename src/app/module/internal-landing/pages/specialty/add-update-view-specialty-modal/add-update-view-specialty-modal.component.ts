import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CreateSpecialtyModelRequest, SpecialtyModel } from 'src/app/module/models/specialty/specialty-models';
import { SpecialtyService } from '../service/specialty.service';

@Component({
  selector: 'app-add-update-view-specialty-modal',
  templateUrl: './add-update-view-specialty-modal.component.html',
  styleUrls: ['./add-update-view-specialty-modal.component.css']
})
export class AddUpdateViewSpecialtyModalComponent implements OnInit {
  loading = false;
  @Input() specialty: SpecialtyModel | null;
  specialtyForm: FormGroup;
  addSpecialty: CreateSpecialtyModelRequest = new CreateSpecialtyModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewSpecialtyModalComponent>,
    private _formBuilder: FormBuilder,
    private _specialtyService: SpecialtyService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.specialtyForm = this._formBuilder.group({
      descripcionEspecialidad: ['', Validators.required],
    });
    if (this.specialty) {
      this.specialtyForm.patchValue(this.specialty)
    }
  }

  submitSpecialty() {
    this.loading = true
    if (this.specialtyForm.valid) {
      this.addSpecialty = this.specialtyForm.value
      this._specialtyService.postSpecialty(this.addSpecialty).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar Especialidad")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar Especialidad")
        }
      )
    }
  }

  updateSpecialty() {
    this.loading = true
    if (this.specialtyForm.valid) {
      if (this.specialty) {
        this.specialty.descripcionEspecialidad = this.specialtyForm.value.descripcionEspecialidad;
        this._specialtyService.patchSpecialty(this.specialty).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar Especialidad")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar Especialidad")
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
