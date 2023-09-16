import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ToastrService } from 'ngx-toastr';
import { PetModel } from 'src/app/module/models/pet/pet-models';
import { SuccessModalComponent } from '../consultation/success-modal/success-modal.component';
import { PetService } from '../pet/service/pet.service';
import { PredictionService } from './service/prediction.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  loading = false;
  listPetByClient: PetModel[] = []
  predicionForm: FormGroup;
  modalSuccess: MdbModalRef<SuccessModalComponent>
  originalIdMascota: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _petService: PetService,
    private _predictionService: PredictionService,
    private _modalService: MdbModalService) { }

  ngOnInit(): void {
    this.predicionForm = this._formBuilder.group({
      idMascota: ['', Validators.required],
      edadMeses: ['', Validators.required],
      diarrea: [false],
      vomitos: [false],
      fiebre: [false],
      perdidaPeso: [false],
      debilidad: [false],
      dolorAbdominal: [false],
      deshidratacion: [false],
    })

    this.getListPet()
  }

  getListPet() {
    this.loading = true
    this._petService.getListPetByClient().subscribe(
      (response) => {
        this.listPetByClient = response.filter(elemet => elemet.estadoMascota === "A")
        this.listPetByClient = this.listPetByClient.slice().sort((a, b) => a.nombreMascota.localeCompare(b.nombreMascota))
        this.originalIdMascota = this.listPetByClient[0].idMascota
        this.predicionForm.patchValue({
          idMascota: this.listPetByClient[0].idMascota
        });

        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de mascotas")
      }
    );
  }

  checkPrediction() {
    this.loading = true
    if (this.predicionForm.valid) {
      this._predictionService.postPrediction(this.predicionForm.value).subscribe(
        (response) => {
          this.loading = false
          this.successModal(response)
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.error, "Predicción")
        }
      )
    }
  }

  successModal(prediction: any) {
    console.log(prediction);
    this.modalSuccess = this._modalService.open(SuccessModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalSuccess.component.prediction = prediction

    this.modalSuccess.onClose.subscribe(() => {
    });
  }

  cleanFields() {
    this.getListPet()
    this.predicionForm.reset({
      edadMeses: '',
      diarrea: false,
      vomitos: false,
      fiebre: false,
      perdidaPeso: false,
      debilidad: false,
      dolorAbdominal: false,
      deshidratacion: false,
    });
  }

}
