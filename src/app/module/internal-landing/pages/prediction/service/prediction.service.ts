import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { PredictionModel } from 'src/app/module/models/prediction/prediction-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PredictionService extends BaseService {

  private postApiUrl = "/prediccion/modeloPrediccion"

  constructor(private _httpClient: HttpClient) {
    super();
  }

  postPrediction(predictionModel: PredictionModel) : Observable<any> {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<any>(url, predictionModel, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
