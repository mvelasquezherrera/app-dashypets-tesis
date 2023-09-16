import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { SymptomService } from '../service/symptom.service';
import { CreateSymptomModelRequest, SymptomModel } from 'src/app/module/models/symptom/symptom-models';

@Component({
  selector: 'app-add-update-view-symptom-modal',
  templateUrl: './add-update-view-symptom-modal.component.html',
  styleUrls: ['./add-update-view-symptom-modal.component.css']
})
export class AddUpdateViewSymptomModalComponent implements OnInit {
  loading = false;
  @Input() symptom: SymptomModel | null;
  symptomForm: FormGroup;
  addSymptom: CreateSymptomModelRequest = new CreateSymptomModelRequest()

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewSymptomModalComponent>,
    private _formBuilder: FormBuilder,
    private _symptomService: SymptomService,
    private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.symptomForm = this._formBuilder.group({
      descripcionSintoma: ['', Validators.required],
    });
    if (this.symptom) {
      this.symptomForm.patchValue(this.symptom)
    }
  }

  submitSymptom() {
    this.loading = true
    if (this.symptomForm.valid) {
      this.addSymptom = this.symptomForm.value
      this._symptomService.postSymptom(this.addSymptom).subscribe(
        (response) => {
          const message = response.message
          this._toastr.success(message, "Agregar Síntoma")
          this.closeModal()
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Agregar Síntoma")
        }
      )
    }
  }

  updateSymptom() {
    this.loading = true
    if (this.symptomForm.valid) {
      if (this.symptom) {
        this.symptom.descripcionSintoma = this.symptomForm.value.descripcionSintoma;
        this._symptomService.patchSymptom(this.symptom).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar síntoma")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar síntoma")
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
