import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { VetService } from "../service/vet.service";
import { VetModel } from "src/app/module/models/vet/vet-models";

@Component({
  selector: 'app-activate-deactivate-vet-modal',
  templateUrl: './activate-deactivate-vet-modal.component.html',
  styleUrls: ['./activate-deactivate-vet-modal.component.css']
})
export class ActivateDeactivateVetModalComponent implements OnInit {
  loading = false;
  @Input() vet: VetModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivateVetModalComponent>,
    private _formBuilder: FormBuilder,
    private _vetService: VetService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivateVet() {
    this.loading = true
    if(this.vet){
      if(this.vet.activateVet){
        this.vet.estadoVeterinario = "I"
        this._vetService.patchVet(this.vet).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Veterinario")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Veterinario")
            this._modalRef.close();
          }
        )
      }else{
        this.vet.estadoVeterinario = "A"
        this._vetService.patchVet(this.vet).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Veterinario")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Veterinario")
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
