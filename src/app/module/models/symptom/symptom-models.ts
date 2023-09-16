export class SymptomModel {
  idSintoma: number
  descripcionSintoma: string
  estadoSintoma: string
  viewSymptom: boolean
  editSymptom: boolean
  addSymptom: boolean
  activateSymptom: boolean = false
  deactivateSymptom: boolean = false
  tieneSintoma: boolean = false
}

export class CreateSymptomModelRequest {
  descripcionSintoma: string
}

export class SymptomModelResponse {
  message: string
}
