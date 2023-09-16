import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { DiseaseService } from "../service/disease.service";
import { DiseaseModel } from "src/app/module/models/disease/disease-models";

@Component({
  selector: 'app-activate-deactivate-disease-modal',
  templateUrl: './activate-deactivate-disease-modal.component.html',
  styleUrls: ['./activate-deactivate-disease-modal.component.css']
})
export class ActivateDeactivateDiseaseModalComponent implements OnInit {
  loading = false;
  @Input() disease: DiseaseModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateDiseaseModalComponent>,
    private _diseaseService: DiseaseService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivateDisease() {
    this.loading = true
    if(this.disease){
      if(this.disease.activateDisease){
        this.disease.estadoEnfermedad = "I"
        this._diseaseService.patchDisease(this.disease).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Enfermedad")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Enfermedad")
            this._modalRef.close();
          }
        )
      }else{
        this.disease.estadoEnfermedad = "A"
        this._diseaseService.patchDisease(this.disease).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Enfermedad")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Enfermedad")
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
