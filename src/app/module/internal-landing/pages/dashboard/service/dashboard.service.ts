import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { DashboardPanelModelResponse } from 'src/app/module/models/dashboard/dashboard-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService extends BaseService {

  private getApiUrl = "/dashboard/datosPaneles"


  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListDataPanelDashboard(): Observable<DashboardPanelModelResponse[]> {
    const url = this.getUrlBase() + this.getApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DashboardPanelModelResponse[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}

