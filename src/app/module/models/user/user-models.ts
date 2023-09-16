export class UserModel {
  usuario: string
  clave: string
  estadoUsuario: string
  viewUser: boolean
  editUser: boolean
  addUser: boolean
  activateUser: boolean = false
  deactivateUser: boolean = false
  usuarioUpdate: string
}

export class CreateUserModelRequest {
  usuario: string
  clave: string
}

export class UserModelResponse {
  message: string
} 