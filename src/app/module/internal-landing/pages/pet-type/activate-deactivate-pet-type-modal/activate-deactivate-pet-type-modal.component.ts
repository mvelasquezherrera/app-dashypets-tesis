import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { PetTypeModel } from "src/app/module/models/pet-type/pet-type-models";
import { PetTypeService } from "../service/pet-type.service";

@Component({
  selector: 'app-activate-deactivate-pet-type-modal',
  templateUrl: './activate-deactivate-pet-type-modal.component.html',
  styleUrls: ['./activate-deactivate-pet-type-modal.component.css']
})
export class ActivateDeactivatePetTypeModalComponent implements OnInit {
  loading = false;
  @Input() petType: PetTypeModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivatePetTypeModalComponent>,
    private _petTypeService: PetTypeService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivatePetType() {
    this.loading = true
    if(this.petType){
      if(this.petType.activatePetType){
        this.petType.estadoTipoMascota = "I"
        this._petTypeService.patchPetType(this.petType).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar raza de perro")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar raza de perro")
            this._modalRef.close();
          }
        )
      }else{
        this.petType.estadoTipoMascota = "A"
        this._petTypeService.patchPetType(this.petType).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar raza de perro")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar raza de perro")
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
