import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreatePetTypeModelRequest, PetTypeModel, PetTypeModelResponse } from 'src/app/module/models/pet-type/pet-type-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PetTypeService extends BaseService {

  private getApiUrl = "/tipoMascota/listarTipoMascota"
  private postApiUrl = "/tipoMascota/registrarTipoMascota"
  private patchApiUrl = "/tipoMascota/actualizarTipoMascota"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListPetType(): Observable<PetTypeModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<PetTypeModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postPetType(petType: CreatePetTypeModelRequest) : Observable<PetTypeModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<PetTypeModelResponse>(url, petType, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchPetType(petType: PetTypeModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<PetTypeModelResponse>(url, petType, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}

