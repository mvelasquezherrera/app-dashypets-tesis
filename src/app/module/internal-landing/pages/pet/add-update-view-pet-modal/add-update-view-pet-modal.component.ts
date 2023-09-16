import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "../../customer/service/customer.service";
import { PetTypeService } from "../../pet-type/service/pet-type.service";
import { PetClassService } from "../../pet-class/service/pet-class.service";
import { PetClassModel } from "src/app/module/models/pet-class/pet-class-models";
import { PetTypeModel } from "src/app/module/models/pet-type/pet-type-models";
import { CustomerModel } from "src/app/module/models/customer/customer-models";
import { CreatePetModelRequest, PetModel } from "src/app/module/models/pet/pet-models";
import { PetService } from "../service/pet.service";

@Component({
  selector: 'app-add-update-view-pet-modal',
  templateUrl: './add-update-view-pet-modal.component.html',
  styleUrls: ['./add-update-view-pet-modal.component.css']
})
export class AddUpdateViewPetModalComponent implements OnInit {
  loading = false;
  @Input() pet: PetModel | null;
  petForm: FormGroup;
  newPet: CreatePetModelRequest = new CreatePetModelRequest();
  listCustomer: CustomerModel[] = []
  listPetClass: PetClassModel[] = []
  listPetType: PetTypeModel[] = []

  constructor(
    private _modalRef: MdbModalRef<AddUpdateViewPetModalComponent>,
    private _formBuilder: FormBuilder,
    private _petService: PetService,
    private _toastr: ToastrService,
    private _customerService: CustomerService,
    private _petTypeService: PetTypeService,
    private _petClassService: PetClassService) {

  }
  ngOnInit(): void {
    this.petForm = this._formBuilder.group({
      nombreMascota: ['', Validators.required],
      color: ['', Validators.required],
      fechaNacimiento: [''],
      observaciones: ['', Validators.required],
      tratamiento: ['', Validators.required],
      sexo: ['M'],
      idCliente: ['', Validators.required],
      idTipoMascota: ['', Validators.required],
      idClaseMascota: ['', Validators.required]
    });

    this.getListCustomer()
    this.getListPetClass()
    this.getListPetType()

    if (this.pet) {
      this.pet.fechaNacimiento = this.pet.fechaNacimiento.substring(0, 10);
      if (this.pet.viewPet)
        this.pet.sexo = this.pet.sexo === "M" ? "Macho" : "Hembra";
      this.petForm.patchValue(this.pet)
    }
  }

  getListCustomer() {
    this.loading = true
    this._customerService.getListCustomer().subscribe(
      (response) => {
        this.listCustomer = response.filter(elemet => elemet.estadoCliente === "A")
        this.listCustomer = this.listCustomer.slice().sort((a, b) => a.apellidoPaterno.localeCompare(b.apellidoPaterno))
        if(this.pet)
        this.petForm.patchValue({
          idCliente: this.pet.idCliente
        });
        else 
          this.petForm.patchValue({
            idCliente: this.listCustomer[0].idCliente
          });
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de clientes")
      }
    );
  }

  getListPetClass() {
    this.loading = true
    this._petClassService.getListPetClass().subscribe(
      (response) => {
        this.listPetClass = response.filter(elemet => elemet.estadoClaseMascota === "A")
        this.listPetClass = this.listPetClass.slice().sort((a, b) => a.descripcionClaseMascota.localeCompare(b.descripcionClaseMascota))
        if(this.pet)
          this.petForm.patchValue({
            idClaseMascota: this.pet.idClaseMascota
          });
        else
          this.petForm.patchValue({
            idClaseMascota: this.listPetClass[0].idClaseMascota
          });
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de clases de mascotas")
      }
    );
  }

  getListPetType() {
    this.loading = true
    this._petTypeService.getListPetType().subscribe(
      (response) => {
        this.listPetType = response.filter(elemet => elemet.estadoTipoMascota === "A")
        this.listPetType = this.listPetType.slice().sort((a, b) => a.descripcionTipoMascota.localeCompare(b.descripcionTipoMascota))
        if(this.pet)
          this.petForm.patchValue({
            idTipoMascota: this.pet.idTipoMascota
          });
        else 
          this.petForm.patchValue({
            idTipoMascota: this.listPetType[0].idTipoMascota
          });
        this.loading = false
      },
      (error) => {
        this.loading = false
        this._toastr.error(error.error.error, "Lista de tipos de mascotas")
      }
    );
  }

  regiterPet() {
    this.loading = true
    if (this.petForm.valid) {
      this._petService.postPet(this.petForm.value).subscribe(
        (response) => {
          this.loading = false
          this._toastr.success(response.message, "Registrar mascota")
          this._modalRef.close();
        },
        (error) => {
          this.loading = false;
          this._toastr.error(error.message, "Registrar mascota")
          this._modalRef.close();
        }
      )
    }
  }

  updatePet() {
    this.loading = true
    if (this.petForm.valid) {
      if (this.pet) {
        this.pet.idCliente = this.petForm.value.idCliente
        this.pet.idTipoMascota = this.petForm.value.idTipoMascota
        this.pet.idClaseMascota = this.petForm.value.idClaseMascota
        this.pet.fechaNacimiento = this.petForm.value.fechaNacimiento
        this.pet.nombreMascota = this.petForm.value.nombreMascota
        this.pet.color = this.petForm.value.color
        this.pet.sexo = this.petForm.value.sexo
        this.pet.observaciones = this.petForm.value.observaciones
        this.pet.tratamiento = this.petForm.value.tratamiento
        this._petService.patchPet(this.pet).subscribe(
          (response) => {
            this.loading = false
            this._toastr.success(response.message, "Actualizar Mascota")
            this._modalRef.close();
          },
          (error) => {
            this.loading = false;
            this._toastr.error(error.message, "Actualizar Mascota")
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
