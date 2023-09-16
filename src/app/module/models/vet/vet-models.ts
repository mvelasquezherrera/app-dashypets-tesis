export class VetModel {
  idVeterinario: number
  dni: number
  idEspecialidad: number
  descripcionEspecialidad: string
  nombreVeterinario: string
  nombre1: string
  nombre2: string
  nombre3: string
  apellidoPaterno: string
  apellidoMaterno: string
  sexo: string
  fechaNacimiento: string
  correo: string
  celular: string
  direccion: string
  usuario: string
  estadoVeterinario: string
  addVet: boolean
  editVet: boolean
  viewVet: boolean
  activateVet: boolean = false
  deactivateVet: boolean = false
}

export class CreateVetModelRequest {
  idEspecialidad: number
  dni: number
  nombre1: string
  nombre2: string
  nombre3: string
  apellidoPaterno: string
  apellidoMaterno: string
  sexo: string
  fechaNacimiento: string
  correo: string
  celular: string
  direccion: string
  usuario: string
}

export class VetModelResponse {
  message: string
}

