import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ConsultationModel, ConsultationModelResponse, CreateConsultationModelRequest } from 'src/app/module/models/consultation/consultation-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends BaseService {

  private getApiUrl = "/consulta/listarConsulta"
  private postApiUrl = "/consulta/registrarConsulta"
  private patchApiUrl = "/consulta/actualizarConsulta"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListConsultation(startDate: string | null, endDate: string | null): Observable<ConsultationModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    let params = new HttpParams();
    if(startDate)
      params = params.append('fechaInicio', startDate);
    if(endDate)
      params = params.append('fechaFin', endDate);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<ConsultationModel[]>(url, { params: params, headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  postConsultation(vet: CreateConsultationModelRequest) : Observable<ConsultationModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<ConsultationModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchConsultation(vet: ConsultationModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<ConsultationModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}

