import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { DashboardPanelModelResponse, 
  DashboardRazaRangoEdadModelResponse,
  DashboardRazaSexoModelResponse
} from 'src/app/module/models/dashboard/dashboard-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService extends BaseService {

  private getUrlDatosPaneles = "/dashboard/datosPaneles"
  private getUrlRazaRangoEdad = "/dashboard/datosRazasCantidadRangoEdades"
  private getUrlRazaSexo = "/dashboard/datosRazasCantidadSexo"

  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListDataPanelDashboard(): Observable<DashboardPanelModelResponse[]> {
    const url = this.getUrlBase() + this.getUrlDatosPaneles;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DashboardPanelModelResponse[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getListRazaRangoEdad(): Observable<DashboardRazaRangoEdadModelResponse[]> {
    const url = this.getUrlBase() + this.getUrlRazaRangoEdad;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DashboardRazaRangoEdadModelResponse[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getListRazaSexo(): Observable<DashboardRazaSexoModelResponse[]> {
    const url = this.getUrlBase() + this.getUrlRazaSexo;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DashboardRazaSexoModelResponse[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}

