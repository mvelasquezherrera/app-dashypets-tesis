import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateUserModelRequest, UserModel, UserModelResponse } from 'src/app/module/models/user/user-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private getApiUrl = "/usuario/listarUsuario"
  private postApiUrl = "/usuario/registrarUsuario"
  private patchApiUrl = "/usuario/actualizarUsuario"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListUser(): Observable<UserModel[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<UserModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postUser(vet: CreateUserModelRequest) : Observable<UserModelResponse> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<UserModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchUser(vet: UserModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<UserModelResponse>(url, vet, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}


