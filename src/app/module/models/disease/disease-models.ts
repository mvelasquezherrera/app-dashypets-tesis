export class DiseaseModel {
  idEnfermedad: number
  descripcionEnfermedad: string
  estadoEnfermedad: string
  viewDisease: boolean
  editDisease: boolean
  addDisease: boolean
  activateDisease: boolean = false
  deactivateDisease: boolean = false
}

export class CreateDiseaseModelRequest {
  descripcionEnfermedad: string
}

export class DiseaseModelResponse {
  message: string
}
