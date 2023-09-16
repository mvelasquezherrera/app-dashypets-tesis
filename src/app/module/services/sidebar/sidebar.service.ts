import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuOption } from '../../models/sidebar/sidebarModelResponse';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService extends BaseService {

  private apiUrl = "/menu"

  constructor(private _httpClient: HttpClient) {
    super();
  }

  getMunuOptions(): Observable<MenuOption[]> {
    const url = this.getUrlBase() + this.apiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<MenuOption[]>(url, { headers });
  }

}
