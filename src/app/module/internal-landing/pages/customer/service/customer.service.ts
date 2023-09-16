import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CreateCustomerModelRequest, CustomerModel, CustomerModelResponse } from 'src/app/module/models/customer/customer-models';
import { BaseService } from 'src/app/module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  private getapiUrl = "/cliente/listarCliente"
  private postApiUrl = "/cliente/registrarCliente"
  private patchApiUrl = "/cliente/actualizarCliente"

  constructor(private _httpClient: HttpClient) {
    super();
  }

  getListCustomer(): Observable<CustomerModel[]> {
    const url = this.getUrlBase() + this.getapiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<CustomerModel[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );;
  }

  postCustomer(customer: CreateCustomerModelRequest) {
    const url = this.getUrlBase() + this.postApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<CustomerModelResponse>(url, customer, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patchCustomer(customer: CustomerModel) {
    const url = this.getUrlBase() + this.patchApiUrl;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.patch<CustomerModelResponse>(url, customer, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
