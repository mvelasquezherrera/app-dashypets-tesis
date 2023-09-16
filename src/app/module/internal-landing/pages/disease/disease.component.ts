import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ActivateDeactivateDiseaseModalComponent } from './activate-deactivate-disease-modal/activate-deactivate-disease-modal.component';
import { AddUpdateViewDiseaseModalComponent } from './add-update-view-disease-modal/add-update-view-disease-modal.component';
import { DiseaseService } from './service/disease.service';
import { DiseaseModel } from 'src/app/module/models/disease/disease-models';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent implements OnInit {
  loading = false;
  listDisease: DiseaseModel[] = []
  selectDisease: DiseaseModel | null
  addDisease = false
  viewDisease = false
  editDisease = false
  modalRef: MdbModalRef<AddUpdateViewDiseaseModalComponent>;
  activateDeactivateDisease: MdbModalRef<ActivateDeactivateDiseaseModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _diseaseService: DiseaseService) {

  }

  ngOnInit(): void {
    this.getListDisease()
  }

  getListDisease() {
    this.loading = true
    this._diseaseService.getListDisease().subscribe(
      (response) => {
        this.listDisease = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Enfermedades")
      }
    );
  }

  openModal(Disease: DiseaseModel | null, addDisease: boolean, viewDisease: boolean, editDisease: boolean) {
    this.selectDisease = Disease
    if(this.selectDisease != undefined){
      this.selectDisease.addDisease = addDisease
      this.selectDisease.editDisease = editDisease
      this.selectDisease.viewDisease = viewDisease
    }

    this.modalRef = this._modalService.open(AddUpdateViewDiseaseModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.disease = this.selectDisease

    this.modalRef.onClose.subscribe(() => {
      this.getListDisease()
    });

  }

  activateDeactivateModal(disease: DiseaseModel){
    this.selectDisease = disease
    if(this.selectDisease.estadoEnfermedad === "A") {
      this.selectDisease.activateDisease = true
      this.selectDisease.deactivateDisease = false
    }
    if(this.selectDisease.estadoEnfermedad === "I") {
      this.selectDisease.deactivateDisease = true
      this.selectDisease.activateDisease = false
    }
    this.activateDeactivateDisease = this._modalService.open(ActivateDeactivateDiseaseModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateDisease.component.disease = this.selectDisease

    this.activateDeactivateDisease.onClose.subscribe(() => {
    });
  }

}
