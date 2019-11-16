import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsService } from "../../services/projects.service";
import { Project } from "../../models/project";
import { HttpEventType, HttpClient} from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { FileService } from "../../services/file.service";
import { ConfigurationService } from '../../services/configuration.service';
import { AccountService } from "../../services/account.service";
import { Permission } from "../../models/permission.model";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
    public project:Project;
  constructor(private route: ActivatedRoute, private projectService: ProjectsService, private fileService: FileService, private configurations: ConfigurationService, private accountService: AccountService) { }

  ngOnInit() {
    this.project = this.route.snapshot.data.project;
    this.project.images.path = this.configurations.baseUrl +'/images/'+ this.project.images.path;
    this.projectService.addView(this.project.id).subscribe();
    console.log(this.accountService.userHasPermission(Permission.viewProjectStatistics));
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


  get canViewStatistics() {
    console.log(this.accountService.userHasPermission(Permission.viewProjectStatistics));
      return this.accountService.userHasPermission(Permission.viewProjectStatistics);
    }

}





