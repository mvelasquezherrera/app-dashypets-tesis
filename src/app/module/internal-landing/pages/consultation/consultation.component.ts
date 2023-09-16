import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ConsultationModel } from 'src/app/module/models/consultation/consultation-models';
import { ActivateDeactivateConsultationModalComponent } from './activate-deactivate-consultation-modal/activate-deactivate-consultation-modal.component';
import { AddUpdateViewConsultationModalComponent } from './add-update-view-consultation-modal/add-update-view-consultation-modal.component';
import { ConsultationService } from './service/consultation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  loading = false;
  listConsultation: ConsultationModel[] = []
  selectConsultation: ConsultationModel | null
  addConsultation = false
  viewConsultation = false
  editConsultation = false
  modalRef: MdbModalRef<AddUpdateViewConsultationModalComponent>;
  activateDeactivateModalRef: MdbModalRef<ActivateDeactivateConsultationModalComponent>;
  searchTerm: string = '';
  startDate: string | null = null;
  endDate: string | null = null;

  constructor(private _modalService: MdbModalService, private _vetService: ConsultationService, private _toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getListConsultation()
  }

  getListConsultation() {
    this.startDate = null,
    this.endDate = null
    this.loading = true
    this._vetService.getListConsultation(this.startDate, this.endDate).subscribe(
      (response) => {
        this.listConsultation = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de consultas")
      }
    );
  }

  addViewEditConsultationModal(consultation: ConsultationModel | null, addConsultation: boolean, viewConsultation: boolean, editConsultation: boolean) {
    this.selectConsultation = consultation
    if (this.selectConsultation != undefined) {
      this.selectConsultation.addConsultation = addConsultation
      this.selectConsultation.editConsultation = editConsultation
      this.selectConsultation.viewConsultation = viewConsultation
    }

    this.modalRef = this._modalService.open(AddUpdateViewConsultationModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.consultation = this.selectConsultation

    this.modalRef.onClose.subscribe(() => {
      this.getListConsultation()
    });

  }

  activateDeactivateModal(consultation: ConsultationModel) {

    this.selectConsultation = consultation
    if (this.selectConsultation.estadoConsulta === "A") {
      this.selectConsultation.activateConsultation = true
      this.selectConsultation.deactivateConsultation = false
    }
    if (this.selectConsultation.estadoConsulta === "I") {
      this.selectConsultation.deactivateConsultation = true
      this.selectConsultation.activateConsultation = false
    }

    this.activateDeactivateModalRef = this._modalService.open(ActivateDeactivateConsultationModalComponent, {
      ignoreBackdropClick: true
    });
    this.activateDeactivateModalRef.component.consultation = this.selectConsultation

    this.activateDeactivateModalRef.onClose.subscribe(() => {
    });
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
  }

  onStartDateChange(event: any): void {
    this.startDate = event.target.value;
  }

  onEndDateChange(event: any): void {
    this.endDate = event.target.value;
  }

  search() {
    this.loading = true
    this._vetService.getListConsultation(this.startDate, this.endDate).subscribe(
      (response) => {
        this.listConsultation = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de consultas")
      }
    );
  }

}
