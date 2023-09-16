import { SymptomModel } from "../symptom/symptom-models"

export class ConsultationModel {
    idConsulta: number
    idVeterinario: number
    nombreCompletoVeterinario: string
    especialidadVeterinario: string
    nombreCompletoCliente: string
    nombreMascota: string
    descripcionTipoMascota: string
    descripcionClaseMascota: string
    descripcionEnfermedad: string
    fechaConsulta: string
    fechaProximaConsulta: string
    diagnostico: string
    edadMeses: number
    tratamiento: string
    observaciones: string
    estadoConsulta: string
    addConsultation: boolean
    viewConsultation: boolean
    editConsultation: boolean
    idMascota: number
    idEnfermedad: number
    activateConsultation: boolean = false
    deactivateConsultation: boolean = false
    sintomasChecklist: SymptomModel[]
    sintomasConcatenado: string
}

export class CreateConsultationModelRequest {
    idVeterinario: number
    idMascota: number
    idEnfermedad: number
    fechaConsulta: string
    fechaProximaConsulta: string
    diagnostico: string
    tratamiento: string
    observaciones: string
}

export class ConsultationModelResponse {
    message: string
    prediction: any
}