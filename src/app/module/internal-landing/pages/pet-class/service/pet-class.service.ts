import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreatePetClassModelRequest, PetClassModel, PetClassModelResponse } from 'src/app/module/models/pet-class/pet-class-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PetClassService extends BaseService {

  private getApiUrl = "/claseMascota/listarClaseMascota"
  private postApiUrl = "/claseMascota/registrarClaseMascota"
  private patchApiUrl = "/claseMascota/actualizarClaseMascota"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListPetClass(): Observable<PetClassModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<PetClassModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postPetClass(petClass: CreatePetClassModelRequest) : Observable<PetClassModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Class': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<PetClassModelResponse>(url, petClass, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchPetClass(petClass: PetClassModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Class': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<PetClassModelResponse>(url, petClass, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}


