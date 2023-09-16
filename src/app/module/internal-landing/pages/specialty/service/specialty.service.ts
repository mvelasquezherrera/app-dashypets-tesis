import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CreateSpecialtyModelRequest, SpecialtyModel, SpecialtyModelResponse } from 'src/app/module/models/specialty/specialty-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends BaseService {

  private getApiUrl = "/especialidad/listarEspecialidad"
  private postApiUrl = "/especialidad/registrarEspecialidad"
  private patchApiUrl = "/especialidad/actualizarEspecialidad"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListSpecialty(): Observable<SpecialtyModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<SpecialtyModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postSpecialty(specialty: CreateSpecialtyModelRequest) : Observable<SpecialtyModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<SpecialtyModelResponse>(url, specialty, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchSpecialty(specialty: SpecialtyModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<SpecialtyModelResponse>(url, specialty, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}

