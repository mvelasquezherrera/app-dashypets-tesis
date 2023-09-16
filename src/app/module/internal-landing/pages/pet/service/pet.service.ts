import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CreatePetModelRequest, PetModel, PetModelResponse } from 'src/app/module/models/pet/pet-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PetService extends BaseService {

  private getApiUrl = "/mascota/listarMascota"
  private getApiByClientUrl = "/mascota/listarMascotaCliente"
  private postApiUrl = "/mascota/registrarMascota"
  private patchApiUrl = "/mascota/actualizarMascota"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListPet(): Observable<PetModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<PetModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getListPetByClient(): Observable<PetModel[]> {
    const url = this.getUrlBase() + this.getApiByClientUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<PetModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postPet(vet: CreatePetModelRequest) : Observable<PetModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<PetModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchPet(vet: PetModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<PetModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}

