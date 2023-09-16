import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SymptomModel, CreateSymptomModelRequest, SymptomModelResponse } from 'src/app/module/models/symptom/symptom-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SymptomService extends BaseService {

  private getApiUrl = "/sintoma/listarSintoma"
  private postApiUrl = "/sintoma/registrarSintoma"
  private patchApiUrl = "/sintoma/actualizarSintoma"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListSymptom(): Observable<SymptomModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<SymptomModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postSymptom(disease: CreateSymptomModelRequest) : Observable<SymptomModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<SymptomModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchSymptom(disease: SymptomModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<SymptomModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
