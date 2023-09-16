import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CreateVetModelRequest, VetModel, VetModelResponse } from 'src/app/module/models/vet/vet-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class VetService extends BaseService {

  private getApiUrl = "/veterinario/listarVeterinario"
  private postApiUrl = "/veterinario/registrarVeterinario"
  private patchApiUrl = "/veterinario/actualizarVeterinario"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListVet(): Observable<VetModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<VetModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postVet(vet: CreateVetModelRequest) : Observable<VetModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<VetModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchVet(vet: VetModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<VetModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}

