import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginModelRequest } from '../../models/login/loginModelRequest';
import { LoginModelResponse } from '../../models/login/loginModelResponse';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  private apiUrl = "/login"

  constructor(private _httpClient: HttpClient) {
    super();
  }

  public login(LoginModelRequest: LoginModelRequest): Observable<LoginModelResponse> {
    const url = this.getUrlBase() + this.apiUrl;
    return this._httpClient.post<LoginModelResponse>(url, LoginModelRequest).pipe(
      catchError(this.handleError)
    );
  }

  public removeSession() {
    localStorage.clear();
  }
}
