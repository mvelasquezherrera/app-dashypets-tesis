import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { SymptomService } from "../service/symptom.service";
import { SymptomModel } from "src/app/module/models/symptom/symptom-models";

@Component({
  selector: 'app-activate-deactivate-symptom-modal',
  templateUrl: './activate-deactivate-symptom-modal.component.html',
  styleUrls: ['./activate-deactivate-symptom-modal.component.css']
})
export class ActivateDeactivateSymptomModalComponent implements OnInit {
  loading = false;
  @Input() symptom: SymptomModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateSymptomModalComponent>,
    private _symptomService: SymptomService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivateSymptom() {
    this.loading = true
    if(this.symptom){
      if(this.symptom.activateSymptom){
        this.symptom.estadoSintoma = "I"
        this._symptomService.patchSymptom(this.symptom).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Síntoma")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Síntoma")
            this._modalRef.close();
          }
        )
      }else{
        this.symptom.estadoSintoma = "A"
        this._symptomService.patchSymptom(this.symptom).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Síntoma")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Síntoma")
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
