import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { DiseaseService } from '../service/disease.service';
import { CreateDiseaseModelRequest, DiseaseModel } from 'src/app/module/models/disease/disease-models';

@Component({
  selector: 'app-add-update-view-disease-modal',
  templateUrl: './add-update-view-disease-modal.component.html',
  styleUrls: ['./add-update-view-disease-modal.component.css']
})
export class AddUpdateViewDiseaseModalComponent implements OnInit {
  loading = false;
  @Input() disease: DiseaseModel | null;
  diseaseForm: FormGroup;
  addDisease: CreateDiseaseModelRequest = new CreateDiseaseModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewDiseaseModalComponent>,
    private _formBuilder: FormBuilder,
    private _diseaseService: DiseaseService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.diseaseForm = this._formBuilder.group({
      descripcionEnfermedad: ['', Validators.required],
    });
    if (this.disease) {
      this.diseaseForm.patchValue(this.disease)
    }
  }

  submitDisease() {
    this.loading = true
    if (this.diseaseForm.valid) {
      this.addDisease = this.diseaseForm.value
      this._diseaseService.postDisease(this.addDisease).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar Enfermedad")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar Enfermedad")
        }
      )
    }
  }

  updateDisease() {
    this.loading = true
    if (this.diseaseForm.valid) {
      if (this.disease) {
        this.disease.descripcionEnfermedad = this.diseaseForm.value.descripcionEnfermedad;
        this._diseaseService.patchDisease(this.disease).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar enfermedad")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar enfermedad")
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
