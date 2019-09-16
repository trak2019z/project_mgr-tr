import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { ProjectsEndpoint } from "./projects-endpoint.service";
import { Project } from "../models/project";


@Injectable()
export class ProjectsService {

  constructor(
    private authService: AuthService,
    private projectEndpoint: ProjectsEndpoint) {
  }
  newProject(project: Project) {
    return this.projectEndpoint.getNewProjectEndpoint<Project>(project);
  }
}
