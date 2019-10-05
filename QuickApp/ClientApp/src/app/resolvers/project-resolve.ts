import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Project } from "../models/project";
import { ProjectsService } from "../services/projects.service";

@Injectable()
export class ProjectResolve implements Resolve<Project> {
    constructor(private projectService: ProjectsService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Project> {
      return this.projectService.getProject(route.params['id']);
    }
}
