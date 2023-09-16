import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { SymptomModel } from 'src/app/module/models/symptom/symptom-models';
import { SymptomService } from './service/symptom.service';
import { ActivateDeactivateSymptomModalComponent } from './activate-deactivate-symptom-modal/activate-deactivate-symptom-modal.component';
import { AddUpdateViewSymptomModalComponent } from './add-update-view-symptom-modal/add-update-view-symptom-modal.component';

@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrls: ['./symptom.component.css']
})
export class SymptomComponent implements OnInit {
  loading = false;
  listSymptom: SymptomModel[] = []
  selectSymptom: SymptomModel | null
  addSymptom = false
  viewSymptom = false
  editSymptom = false
  modalRef: MdbModalRef<AddUpdateViewSymptomModalComponent>;
  activateDeactivateSymptom: MdbModalRef<ActivateDeactivateSymptomModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _symptomService: SymptomService) {

  }

  ngOnInit(): void {
    this.getListSymptom()
  }

  getListSymptom() {
    this.loading = true
    this._symptomService.getListSymptom().subscribe(
      (response) => {
        this.listSymptom = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Síntomas")
      }
    );
  }

  openModal(Symptom: SymptomModel | null, addSymptom: boolean, viewSymptom: boolean, editSymptom: boolean) {
    this.selectSymptom = Symptom
    if(this.selectSymptom != undefined){
      this.selectSymptom.addSymptom = addSymptom
      this.selectSymptom.editSymptom = editSymptom
      this.selectSymptom.viewSymptom = viewSymptom
    }

    this.modalRef = this._modalService.open(AddUpdateViewSymptomModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.symptom = this.selectSymptom

    this.modalRef.onClose.subscribe(() => {
      this.getListSymptom()
    });

  }

  activateDeactivateModal(symptom: SymptomModel){
    this.selectSymptom = symptom
    if(this.selectSymptom.estadoSintoma === "A") {
      this.selectSymptom.activateSymptom = true
      this.selectSymptom.deactivateSymptom = false
    }
    if(this.selectSymptom.estadoSintoma === "I") {
      this.selectSymptom.deactivateSymptom = true
      this.selectSymptom.activateSymptom = false
    }
    this.activateDeactivateSymptom = this._modalService.open(ActivateDeactivateSymptomModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateSymptom.component.symptom = this.selectSymptom

    this.activateDeactivateSymptom.onClose.subscribe(() => {
    });
  }

}
