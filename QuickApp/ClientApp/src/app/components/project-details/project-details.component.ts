import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsService } from "../../services/projects.service";
import { Project } from "../../models/project";
import { HttpEventType, HttpClient} from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { FileService } from "../../services/file.service";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
    public project:Project;
    constructor(private route: ActivatedRoute, private projectService: ProjectsService,private fileService:FileService) { }

  ngOnInit() {
      this.project = this.route.snapshot.data.project;
      this.project.images.path = "https://localhost:44350/images/" + this.project.images.path;
      this.projectService.addView(this.project.id).subscribe();
  }

    onFileDownload() {
      var filename = this.project.projectFile.path.split("/")[1];
      this.fileService.downloadFile(this.project.projectFile.id).subscribe(blob => {
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.setAttribute("href", url);
          link.setAttribute("download", filename);
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}





