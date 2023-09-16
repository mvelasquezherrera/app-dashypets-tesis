import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { SpecialtyModel } from 'src/app/module/models/specialty/specialty-models';
import { SpecialtyService } from './service/specialty.service';
import { AddUpdateViewSpecialtyModalComponent } from './add-update-view-specialty-modal/add-update-view-specialty-modal.component';
import { ActivateDeactivateSpecialtyModalComponent } from './activate-deactivate-specialty-modal/activate-deactivate-specialty-modal.component';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {
  loading = false;
  listSpecialty: SpecialtyModel[] = []
  selectSpecialty: SpecialtyModel | null
  addSpecialty = false
  viewSpecialty = false
  editSpecialty = false
  modalRef: MdbModalRef<AddUpdateViewSpecialtyModalComponent>;
  activateDeactivateSpecialty: MdbModalRef<ActivateDeactivateSpecialtyModalComponent>

  constructor(
    private _modalService: MdbModalService,
    private _toastr: ToastrService,
    private _specialtyService: SpecialtyService) {

  }

  ngOnInit(): void {
    this.getListSpecialty()
  }

  getListSpecialty() {
    this.loading = true
    this._specialtyService.getListSpecialty().subscribe(
      (response) => {
        this.listSpecialty = response;
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de Especialidades")
      }
    );
  }

  openModal(Specialty: SpecialtyModel | null, addSpecialty: boolean, viewSpecialty: boolean, editSpecialty: boolean) {
    this.selectSpecialty = Specialty
    if (this.selectSpecialty != undefined) {
      this.selectSpecialty.addSpecialty = addSpecialty
      this.selectSpecialty.editSpecialty = editSpecialty
      this.selectSpecialty.viewSpecialty = viewSpecialty
    }

    this.modalRef = this._modalService.open(AddUpdateViewSpecialtyModalComponent, {
      ignoreBackdropClick: true
    });
    this.modalRef.component.specialty = this.selectSpecialty

    this.modalRef.onClose.subscribe(() => {
      this.getListSpecialty()
    });

  }

  activateDeactivateModal(specialty: SpecialtyModel) {
    this.selectSpecialty = specialty
    if(this.selectSpecialty.estadoEspecialidad === "A"){
      this.selectSpecialty.activateSpecialty = true
      this.selectSpecialty.deactivateSpecialty = false
    }
    if(this.selectSpecialty.estadoEspecialidad === "I"){
      this.selectSpecialty.activateSpecialty = false
      this.selectSpecialty.deactivateSpecialty = true
    }


    this.activateDeactivateSpecialty = this._modalService.open(ActivateDeactivateSpecialtyModalComponent, {
      ignoreBackdropClick: true
    });

    this.activateDeactivateSpecialty.component.specialty = this.selectSpecialty

    this.activateDeactivateSpecialty.onClose.subscribe(() => {
    });
  }

}
