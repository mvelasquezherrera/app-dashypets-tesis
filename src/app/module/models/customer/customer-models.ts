export class CustomerModel {
  idCliente: number
  apellidoPaterno: string
  apellidoMaterno: string
  dni: number
  nombreCliente: string
  nombre1: string
  nombre2: string
  nombre3: string
  sexo: string
  fechaNacimiento: string
  correo: string
  celular: string
  direccion: string
  estadoCliente: string
  addCustomer: boolean
  viewCustomer: boolean
  editCustomer: boolean
  activateCustomer: boolean = false
  deactivateCustomer: boolean = false
  usuario: string
}

export class CreateCustomerModelRequest {
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
}

export class CustomerModelResponse {
  message: string
}
