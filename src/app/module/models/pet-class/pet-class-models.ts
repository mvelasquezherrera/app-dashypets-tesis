export class PetClassModel {
    idClaseMascota: number
    descripcionClaseMascota: string
    estadoClaseMascota: string
    addPetClass: boolean
    editPetClass: boolean
    viewPetClass: boolean
    activatePetClass: boolean = false
    dactivatePetClass: boolean = false
}

export class CreatePetClassModelRequest {
    descripcionClaseMascota: string
}

export class PetClassModelResponse {
    message: string
}