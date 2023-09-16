import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { ConsultationService } from "../service/consultation.service";
import { ConsultationModel } from "src/app/module/models/consultation/consultation-models";

@Component({
  selector: 'app-activate-deactivate-consultation-modal',
  templateUrl: './activate-deactivate-consultation-modal.component.html',
  styleUrls: ['./activate-deactivate-consultation-modal.component.css']
})
export class ActivateDeactivateConsultationModalComponent implements OnInit {
  loading = false;
  @Input() consultation: ConsultationModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateConsultationModalComponent>,
    private _formBuilder: FormBuilder,
    private _consultationService: ConsultationService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivateConsultation() {
    this.loading = true
    if(this.consultation){
      if(this.consultation.activateConsultation){
        this.consultation.estadoConsulta = "I"
        this._consultationService.patchConsultation(this.consultation).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Consulta")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Consulta")
            this._modalRef.close();
          }
        )
      }else{
        this.consultation.estadoConsulta = "A"
        this._consultationService.patchConsultation(this.consultation).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Consulta")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Consulta")
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
