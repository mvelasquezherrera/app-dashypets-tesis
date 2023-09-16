export class UserRoleAppModel {
    usuario: string
    idRolApp: number
    descripcionRolApp: string
    estadoUsuarioRolApp: string
    viewUserRoleApp: boolean
    editUserRoleApp: boolean
    addUserRoleApp: boolean
    activateUserRoleApp: boolean = false
    deactivateUserRoleApp: boolean = false
    usuarioUpdate: string
    idRolAppUpdate: number
}

export class CreateUserRoleAppModelRequest {
    usuario: string
    idRolApp: number
}

export class UserRoleAppModelResponse {
    message: string
}  