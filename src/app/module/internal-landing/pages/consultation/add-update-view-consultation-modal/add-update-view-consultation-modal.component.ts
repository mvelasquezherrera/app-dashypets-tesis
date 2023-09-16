import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { VetService } from "../../vet/service/vet.service";
import { CreateConsultationModelRequest, ConsultationModel } from "src/app/module/models/consultation/consultation-models";
import { ConsultationService } from "../service/consultation.service";
import { PetService } from "../../pet/service/pet.service";
import { VetModel } from "src/app/module/models/vet/vet-models";
import { PetModel } from "src/app/module/models/pet/pet-models";
import { DiseaseService } from "../../disease/service/disease.service";
import { DiseaseModel } from "src/app/module/models/disease/disease-models";
import { SymptomModel } from "src/app/module/models/symptom/symptom-models";
import { SymptomService } from "../../symptom/service/symptom.service";
import { SuccessModalComponent } from "../success-modal/success-modal.component";

@Component({
  selector: 'app-add-update-view-consultation-modal',
  templateUrl: './add-update-view-consultation-modal.component.html',
  styleUrls: ['./add-update-view-consultation-modal.component.css']
})
export class AddUpdateViewConsultationModalComponent implements OnInit {
  loading = false;
  @Input() consultation: ConsultationModel | null;
  consultationForm: FormGroup;
  newConsultation: CreateConsultationModelRequest = new CreateConsultationModelRequest();
  listVet: VetModel[] = []
  listDisease: DiseaseModel[] = []
  listPet: PetModel[] = []
  listSymptom: SymptomModel[] = []
  modalSuccess: MdbModalRef<SuccessModalComponent>

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewConsultationModalComponent>,
    private _formBuilder: FormBuilder,
    private _consultationService: ConsultationService,
    private _toastr: ToastrService,
    private _vetService: VetService,
    private _petService: PetService,
    private _diseaseService: DiseaseService,
    private _symptomService: SymptomService,
    private _modalService: MdbModalService) {

  }
  ngOnInit(): void {
    this.consultationForm = this._formBuilder.group({
      idVeterinario: ['', Validators.required],
      idMascota: ['', Validators.required],
      idEnfermedad: ['', Validators.required],
      fechaConsulta: ['', Validators.required],
      fechaProximaConsulta: [''],
      edadMeses: ['', Validators.required],
      diagnostico: [''],
      tratamiento: [''],
      observaciones: [''],
      sintomasChecklist: new FormArray([]),
    });

    this.getListVet()
    this.getListDisease()
    this.getListPet()
    this.getListSymptom()

    if (this.consultation) {
      this.consultation.fechaConsulta = this.consultation.fechaConsulta.substring(0, 10);
      if(this.consultation.fechaProximaConsulta != null)
        this.consultation.fechaProximaConsulta = this.consultation.fechaProximaConsulta.substring(0, 10);
      this.consultationForm.patchValue(this.consultation)
    }
  }

  getListVet() {
    this._vetService.getListVet().subscribe(
      (response) => {
        this.listVet = response.filter(elemet => elemet.estadoVeterinario === "A")
        this.listVet = this.listVet.slice().sort((a, b) => a.nombreVeterinario.localeCompare(b.nombreVeterinario))
        if (this.consultation)
          this.consultationForm.patchValue({
            idVeterinario: this.consultation.idVeterinario
          });
        else
          this.consultationForm.patchValue({
            idVeterinario: this.listVet[0].idVeterinario
          });
      },
      (error) => {
        this._toastr.error(error.error.error, "Lista de Veterinarios")
      }
    );
  }

  getListDisease() {
    this._diseaseService.getListDisease().subscribe(
      (response) => {
        this.listDisease = response.filter(elemet => elemet.estadoEnfermedad === "A")
        this.listDisease = this.listDisease.slice().sort((a, b) => a.descripcionEnfermedad.localeCompare(b.descripcionEnfermedad))
        if (this.consultation)
          this.consultationForm.patchValue({
            idEnfermedad: this.consultation.idEnfermedad
          });
        else
          this.consultationForm.patchValue({
            idEnfermedad: this.listDisease[0].idEnfermedad
          });
      },
      (error) => {
        this._toastr.error(error.error.error, "Lista de enfermedades")
      }
    );
  }

  getListPet() {
    this._petService.getListPet().subscribe(
      (response) => {
        this.listPet = response.filter(elemet => elemet.estadoMascota === "A")
        this.listPet = this.listPet.slice().sort((a, b) => a.nombreMascota.localeCompare(b.nombreMascota))
        if (this.consultation)
          this.consultationForm.patchValue({
            idMascota: this.consultation.idMascota
          });
        else
          this.consultationForm.patchValue({
            idMascota: this.listPet[0].idMascota
          });
      },
      (error) => {
        this._toastr.error(error.error.error, "Lista de mascotas")
      }
    );
  }

  getListSymptom() {
    this._symptomService.getListSymptom().subscribe(
      (response) => {
        this.listSymptom = response.filter(elemet => elemet.estadoSintoma === "A")
        this.listSymptom = this.listSymptom.slice().sort((a, b) => a.descripcionSintoma.localeCompare(b.descripcionSintoma))
        if (this.consultation) {
          this.listSymptom = this.consultation.sintomasChecklist
        }
        else {
          this.listSymptom = this.listSymptom
        }
      },
      (error) => {
        this._toastr.error(error.error.error, "Lista de síntomas")
      }
    );
  }

  onCheckboxChange(item: SymptomModel): void {
    item.tieneSintoma = !item.tieneSintoma;
  }

  getSelectedItems(): SymptomModel[] {
    return this.listSymptom.filter(item => item.tieneSintoma);
  }

  regiterConsultation() {
    this.loading = true
    const sintomasChecklist = this.consultationForm.get('sintomasChecklist') as FormArray;
    while (sintomasChecklist.length !== 0) {
      sintomasChecklist.removeAt(0);
    }
    this.getSelectedItems().forEach((sintoma) => {
      sintomasChecklist.push(this._formBuilder.group(sintoma))
    })
    this.consultationForm.updateValueAndValidity();

    if (this.consultationForm.valid) {
      if(this.consultationForm.value.fechaProximaConsulta == '')
      delete this.consultationForm.value.fechaProximaConsulta
      this._consultationService.postConsultation(this.consultationForm.value).subscribe(
        (response) => {
          this.loading = false
          this._toastr.success(response.message, "Registrar Consulta")
          const prediction = {
            message: response.prediction.mensaje,
          };
          this.successModal(prediction)
          this._modalRef.close();
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Registrar Consulta")
          this._modalRef.close();
        }
      )
    }
  }

  updateConsultation() {
    this.loading = true
    if (this.consultationForm.valid) {
      if (this.consultation) {
        this.consultation.idVeterinario = this.consultationForm.value.idVeterinario
        this.consultation.idMascota = this.consultationForm.value.idMascota
        this.consultation.idEnfermedad = this.consultationForm.value.idEnfermedad
        this.consultation.fechaConsulta = this.consultationForm.value.fechaConsulta
        this.consultation.fechaProximaConsulta = this.consultationForm.value.fechaProximaConsulta
        this.consultation.tratamiento = this.consultationForm.value.tratamiento
        this.consultation.observaciones = this.consultationForm.value.observaciones
        this.consultation.diagnostico = this.consultationForm.value.diagnostico
        this.consultation.edadMeses = this.consultationForm.value.edadMeses
        const updateListSymptom = this.listSymptom.filter(elemet => elemet.tieneSintoma === true)
        this.consultation.sintomasChecklist = updateListSymptom

        this._consultationService.patchConsultation(this.consultation).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar Consulta")
            const prediction = {
              message: response.prediction.mensaje,
            };
            this.successModal(prediction)
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar Consulta")
            this._modalRef.close();
          }
        )
      }
    }
  }

  closeModal() {
    this._modalRef.close();
  }

  successModal(prediction: any) {
    this.modalSuccess = this._modalService.open(SuccessModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalSuccess.component.prediction = prediction

    this.modalSuccess.onClose.subscribe(() => {
    });
  }
}
