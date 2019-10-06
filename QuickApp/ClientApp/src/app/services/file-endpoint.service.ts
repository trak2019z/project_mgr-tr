import { EndpointBase } from "./endpoint-base.service";
import { ConfigurationService } from "./configuration.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core/";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class FileEndpointService extends EndpointBase {
  private readonly _downloadFilesUrl: string = '/api/file/download/';

  get downloadFilesUrl() { return this.configurations.baseUrl + this._downloadFilesUrl; }



  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
      super(http, authService);
  }

  private headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'blob',
    Accept: 'blob'
  });
 

  getFileDownloadEndpoint(id: string) {
    return this.http.get(this.downloadFilesUrl + id, { headers: this.headers, responseType: 'blob' }).pipe(
      catchError(error => {
          return this.handleError(error, () => this.getFileDownloadEndpoint(id));
      }));
    }
}
