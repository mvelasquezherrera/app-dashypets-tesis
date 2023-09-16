import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AppRoleModel, AppRoleModelResponse, CreateAppRoleModelRequest } from 'src/app/module/models/app-role/app-role-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AppRoleService extends BaseService {

  private getApiUrl = "/rolApp/listarRolApp"
  private postApiUrl = "/rolApp/registrarRolApp"
  private patchApiUrl = "/rolApp/actualizarRolApp"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListAppRole(): Observable<AppRoleModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<AppRoleModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postAppRole(disease: CreateAppRoleModelRequest) : Observable<AppRoleModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<AppRoleModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchAppRole(disease: AppRoleModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<AppRoleModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
