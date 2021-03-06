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
  private readonly _deleteProjectsUrl: string = '/api/projects/delete';
  private readonly _addViewProjectUrl: string = '/api/projects/view/';

  get createProjectUrl() { return this.configurations.baseUrl + this._createProjectsUrl; }
  get deleteProjectUrl() { return this.configurations.baseUrl + this._deleteProjectsUrl; }

  get getProjectUrl() { return this.configurations.baseUrl + this._projectsUrl; }
  get getAddViewProjectUrl() { return this.configurations.baseUrl + this._addViewProjectUrl; }


  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getNewProjectEndpoint<T>(projectObject: any): Observable<T> {
    return this.http.post<T>(this.createProjectUrl, JSON.stringify(projectObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        console.log(projectObject);
        return this.handleError(error, () => this.getNewProjectEndpoint(projectObject));
      }));
  }


  deleteProjectEndpoint<T>(id: number): Observable<T> {
    return this.http.delete <T> (this.deleteProjectUrl+"/"+ id, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.deleteProjectEndpoint(id));
      }));
  }
  getAddViewProject<T>(id: number): Observable<T> {
    return this.http.post<T>(this.getAddViewProjectUrl + id, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAddViewProject(id));
      }));
  }
  getProjectEndpoint<T>(): Observable<T> {
       return this.http.get<T>(this.getProjectUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectEndpoint());
      }));
  }
  getProjectByIdEndpoint<T>(id: number): Observable<T> {

    return this.http.get<T>(this.getProjectUrl+"/"+id, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectByIdEndpoint(id));
      }));
    }
}
