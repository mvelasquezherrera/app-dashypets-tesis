import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateRoleAppPermissionModelRequest, RoleAppPermissionModel, RoleAppPermissionModelResponse } from 'src/app/module/models/role-app-permission/role-app-permission-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAppPermissionService extends BaseService {

  private getApiUrl = "/rolPermisoApp/listarRolPermisoApp"
  private postApiUrl = "/rolPermisoApp/registrarRolPermisoApp"
  private patchApiUrl = "/rolPermisoApp/actualizarRolPermisoApp"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListRoleAppPermission(): Observable<RoleAppPermissionModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<RoleAppPermissionModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postRoleAppPermission(disease: CreateRoleAppPermissionModelRequest) : Observable<RoleAppPermissionModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<RoleAppPermissionModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchRoleAppPermission(disease: RoleAppPermissionModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<RoleAppPermissionModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
