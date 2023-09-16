import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateUserRoleAppModelRequest, UserRoleAppModel, UserRoleAppModelResponse } from 'src/app/module/models/user-role-app/user-role-app-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleAppService extends BaseService {

  private getApiUrl = "/usuarioRolApp/listarUsuarioRolApp"
  private postApiUrl = "/usuarioRolApp/registrarUsuarioRolApp"
  private patchApiUrl = "/usuarioRolApp/actualizarUsuarioRolApp"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListUserRoleApp(): Observable<UserRoleAppModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<UserRoleAppModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postUserRoleApp(disease: CreateUserRoleAppModelRequest) : Observable<UserRoleAppModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<UserRoleAppModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchUserRoleApp(disease: UserRoleAppModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<UserRoleAppModelResponse>(url, disease, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
