import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { DashboardPanelModelResponse, 
  DashboardRazaRangoEdadModelResponse,
  DashboardRazaSexoModelResponse,
  DashboardSintomasPositivoParvovirusModelResponse,
  DashboardPredecidoConfirmadoParvovirusRazaModelResponse,
  DashboardPredecidoConfirmadoParvovirusAnioModelResponse
} from 'src/app/module/models/dashboard/dashboard-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService extends BaseService {

  private getUrlDatosPaneles = "/dashboard/datosPaneles"
  private getUrlRazaRangoEdad = "/dashboard/datosRazasCantidadRangoEdades"
  private getUrlRazaSexo = "/dashboard/datosRazasCantidadSexo"
  private getUrlSintomasPositivoParvovirus = "/dashboard/datosSintomasCasosPositivoParvovirus"
  private getUrlPredecidoConfirmadoParvovirusRaza = "/dashboard/datosCasosConfirmadosPrediccionParvovirusRaza"
  private getUrlPredecidoConfirmadoParvovirusAnio = "/dashboard/datosCasosConfirmadosPrediccionParvovirusAnio"

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

  getListSintomasPositivoParvovirus(): Observable<DashboardSintomasPositivoParvovirusModelResponse[]> {
    const url = this.getUrlBase() + this.getUrlSintomasPositivoParvovirus;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DashboardSintomasPositivoParvovirusModelResponse[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getListPrediccionPositivoParvovirusRaza(): Observable<DashboardPredecidoConfirmadoParvovirusRazaModelResponse[]> {
    const url = this.getUrlBase() + this.getUrlPredecidoConfirmadoParvovirusRaza;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DashboardPredecidoConfirmadoParvovirusRazaModelResponse[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getListPrediccionPositivoParvovirusAnio(): Observable<DashboardPredecidoConfirmadoParvovirusAnioModelResponse[]> {
    const url = this.getUrlBase() + this.getUrlPredecidoConfirmadoParvovirusAnio;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<DashboardPredecidoConfirmadoParvovirusAnioModelResponse[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}


