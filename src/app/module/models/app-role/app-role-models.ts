export class AppRoleModel {
    idRolApp: number
    descripcionRolApp: string
    abreviacionRolApp: string
    estadoRolApp: string
    viewAppRole: boolean
    editAppRole: boolean
    addAppRole: boolean
    activateAppRole: boolean = false
    deactivateAppRole: boolean = false
}

export class CreateAppRoleModelRequest {
    descripcionRolApp: string
    abreviacionRolApp: string
}

export class AppRoleModelResponse {
    message: string
}