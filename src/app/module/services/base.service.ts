import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export abstract class BaseService {
  protected getUrlBase(): string {
    return environment.BASE_API;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
