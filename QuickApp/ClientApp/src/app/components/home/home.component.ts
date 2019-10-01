
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
  public p:number =1;
  ngOnInit(): void {
    this.projectService.getProjects().subscribe(response => {
      this.posts = response;
      for (var i = 0, len = this.posts.length; i < len; i++) {
        if (this.posts[i].images) {
          this.posts[i].images.path = "https://localhost:44350/images/" + this.posts[i].images.path;
        }
      }
    });
  }


  public onProjectRemove(id: number) {
    console.log("Project remove");
    this.projectService.deleteProject(id).subscribe(response => {
      this.posts.filter(p => p.id !== id);
    });
  }



  constructor(public configurations: ConfigurationService, public projectService: ProjectsService) {
  }
}
