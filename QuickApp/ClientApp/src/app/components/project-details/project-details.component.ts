import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsService } from "../../services/projects.service";
import { Project } from "../../models/project";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
    public project:Project;
  constructor(private route: ActivatedRoute, private service:ProjectsService){}
  ngOnInit() {
    this.project = this.route.snapshot.data.project;
    console.log(this.project);

  }

}
