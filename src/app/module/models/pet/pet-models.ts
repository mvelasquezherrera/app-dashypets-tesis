export class PetModel {
  idMascota: number
  idCliente: number
  nombreCliente: string
  idTipoMascota: number
  descripcionTipoMascota: string
  idClaseMascota: number
  descripcionClaseMascota: string
  sexo: string
  nombreMascota: string
  color: string
  fechaNacimiento: string
  observaciones: string
  tratamiento: string
  estadoMascota: string
  addPet: boolean
  editPet: boolean
  viewPet: boolean
  activatePet: boolean = false
  deactivatePet: boolean = false
}

export class CreatePetModelRequest {
  idCliente: number
  idTipoMascota: number
  idClaseMascota: number
  sexo: number
  nombreMascota: string
  color: string
  fechaNacimiento: string
  observaciones: string
  tratamiento: string
}

export class PetModelResponse {
  message: string
}
