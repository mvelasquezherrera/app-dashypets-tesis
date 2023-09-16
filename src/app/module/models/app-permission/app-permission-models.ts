export class AppPermissionModel {
    idPermisoApp: number
    idPermisoAppPadre: number
    descripcionPermisoApp: string
    icono: string
    estadoPermisoApp: string
    viewAppPermission: boolean
    editAppPermission: boolean
    addAppPermission: boolean
    activateAppPermission: boolean = false
    deactivateAppPermission: boolean = false
}

export class CreateAppPermissionModelRequest {
    idPermisoAppPadre: number
    descripcionPermisoApp: string
    icono: string
}


export class AppPermissionModelResponse {
    message: string
}