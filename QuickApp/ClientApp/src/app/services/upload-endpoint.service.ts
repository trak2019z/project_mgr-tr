import { EndpointBase } from "./endpoint-base.service";
import { ConfigurationService } from "./configuration.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core/";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class UploadEndpoint extends EndpointBase {
  private readonly _projectFileUploadUrl: string = '/api/upload/file';
  private readonly _imageUploadUrl: string = '/api/upload/image';

 public get projectFileUploadUrl() { return this.configurations.baseUrl + this._projectFileUploadUrl; }
 public get imageUploadUrl() { return this.configurations.baseUrl + this._imageUploadUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }
}
