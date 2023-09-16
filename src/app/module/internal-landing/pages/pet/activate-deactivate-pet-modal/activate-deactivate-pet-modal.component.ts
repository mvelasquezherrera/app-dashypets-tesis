import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { PetService } from "../service/pet.service";
import { PetModel } from "src/app/module/models/pet/pet-models";

@Component({
  selector: 'app-activate-deactivate-pet-modal',
  templateUrl: './activate-deactivate-pet-modal.component.html',
  styleUrls: ['./activate-deactivate-pet-modal.component.css']
})
export class ActivateDeactivatePetModalComponent implements OnInit {
  loading = false;
  @Input() pet: PetModel | null;

  constructor(
    private _modalRef: MdbModalRef<ActivateDeactivatePetModalComponent>,
    private _formBuilder: FormBuilder,
    private _petService: PetService,
    private _toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  activateDeactivatePet() {
    this.loading = true
    if(this.pet){
      if(this.pet.activatePet){
        this.pet.estadoMascota = "I"
        this._petService.patchPet(this.pet).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Inactivar Mascota")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Inactivar Mascota")
            this._modalRef.close();
          }
        )
      }else{
        this.pet.estadoMascota = "A"
        this._petService.patchPet(this.pet).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Activar Mascota")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Activar Mascota")
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
