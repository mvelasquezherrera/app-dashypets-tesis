import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateDiseaseModelRequest, DiseaseModel, DiseaseModelResponse } from 'src/app/module/models/disease/disease-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService extends BaseService {

  private getApiUrl = "/enfermedad/listarEnfermedad"
  private postApiUrl = "/enfermedad/registrarEnfermedad"
  private patchApiUrl = "/enfermedad/actualizarEnfermedad"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListDisease(): Observable<DiseaseModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DiseaseModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postDisease(disease: CreateDiseaseModelRequest) : Observable<DiseaseModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<DiseaseModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchDisease(disease: DiseaseModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<DiseaseModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
