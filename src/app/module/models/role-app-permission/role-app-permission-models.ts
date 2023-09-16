export class RoleAppPermissionModel {
    idRolApp: number
    descripcionRolApp: string
    idPermisoApp: number
    descripcionPermisoApp: string
    estadoRolPermisoApp: string
    viewRoleAppPermission: boolean
    editRoleAppPermission: boolean
    addRoleAppPermission: boolean
    activateRoleAppPermission: boolean = false
    deactivateRoleAppPermission: boolean = false
    idRolAppUpdate: number
    idPermisoAppUpdate: number
}

export class CreateRoleAppPermissionModelRequest {
    idRolApp: number
    idPermisoApp: number
}

export class RoleAppPermissionModelResponse {
    message: string
}