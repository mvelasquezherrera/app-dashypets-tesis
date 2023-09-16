import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { SpecialtyModel } from "src/app/module/models/specialty/specialty-models";
import { SpecialtyService } from "../service/specialty.service";

@Component({
  selector: 'app-activate-deactivate-specialty-modal',
  templateUrl: './activate-deactivate-specialty-modal.component.html',
  styleUrls: ['./activate-deactivate-specialty-modal.component.css']
})
export class ActivateDeactivateSpecialtyModalComponent implements OnInit {
  loading = false;
  @Input() specialty: SpecialtyModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateSpecialtyModalComponent>,
    private _specialtyService: SpecialtyService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivateSpecialty() {
    this.loading = true
    if(this.specialty){
      if(this.specialty.activateSpecialty){
        this.specialty.estadoEspecialidad = "I"
        this._specialtyService.patchSpecialty(this.specialty).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Especialidad")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Especialidad")
            this._modalRef.close();
          }
        )
      }else{
        this.specialty.estadoEspecialidad = "A"
        this._specialtyService.patchSpecialty(this.specialty).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Especialidad")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Especialidad")
            this._modalRef.close();
          }
        )
      }
    }
  }

  deactivateSpecialty() {
    this.loading = true
    if(this.specialty){
      if(this.specialty.deactivateSpecialty){
        this.specialty.estadoEspecialidad = "A"
        this._specialtyService.patchSpecialty(this.specialty).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Especialidad")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Especialidad")
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
