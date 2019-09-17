
import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ConfigurationService } from '../../services/configuration.service';
import { ProjectsService } from "../../services/projects.service";
import { GetProjectsResponse } from "../../models/project";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [fadeInOut]
})
export class HomeComponent implements OnInit{
  public posts: GetProjectsResponse[];
  ngOnInit(): void {
    this.projectService.getProjects().subscribe(response => {
      this.posts = response
      console.log(response);
    });
  }



  constructor(public configurations: ConfigurationService, public projectService: ProjectsService) {
  }
}
