import { EndpointBase } from "./endpoint-base.service";
import { ConfigurationService } from "./configuration.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterEndpoint extends EndpointBase {
  private readonly _registerUserUrl: string = '/api/register/register';

  get registerUserUrl() { return this.configurations.baseUrl + this._registerUserUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getRegisterUserEndpoint<T>(userObject: any): Observable<T> {
    return this.http.post<T>(this.registerUserUrl, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        console.log(userObject);
        return this.handleError(error, () => this.getRegisterUserEndpoint(userObject));
      }));
  }

}
