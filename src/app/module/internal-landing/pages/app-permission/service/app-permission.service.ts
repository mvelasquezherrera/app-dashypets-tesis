import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AppPermissionModel, AppPermissionModelResponse, CreateAppPermissionModelRequest } from 'src/app/module/models/app-permission/app-permission-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AppPermissionService extends BaseService {

  private getApiUrl = "/permisoApp/listarPermisoApp"
  private postApiUrl = "/permisoApp/registrarPermisoApp"
  private patchApiUrl = "/permisoApp/actualizarPermisoApp"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListAppPermission(): Observable<AppPermissionModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<AppPermissionModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postAppPermission(disease: CreateAppPermissionModelRequest) : Observable<AppPermissionModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<AppPermissionModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchAppPermission(disease: AppPermissionModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<AppPermissionModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
