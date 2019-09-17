import { EndpointBase } from "./endpoint-base.service";
import { ConfigurationService } from "./configuration.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core/";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ProjectsEndpoint extends EndpointBase {
  private readonly _projectsUrl: string = '/api/projects';
  private readonly _createProjectsUrl: string = '/api/projects/create';

  get createProjectUrl() { return this.configurations.baseUrl + this._createProjectsUrl; }
  get getProjectUrl() { return this.configurations.baseUrl + this._projectsUrl; }


  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getNewProjectEndpoint<T>(projectObject: any): Observable<T> {
    return this.http.post<T>(this.createProjectUrl, JSON.stringify(projectObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewProjectEndpoint(projectObject));
      }));
  }

  getProjectEndpoint<T>(): Observable<T> {
    return this.http.get<T>(this.getProjectUrl,this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectEndpoint());
      }));
  }


}
