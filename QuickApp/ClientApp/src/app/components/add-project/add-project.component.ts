import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectsService } from "../../services/projects.service";
import { Project, ProjectFile } from "../../models/project";
import { Image } from "../../models/project";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'add-project',
    templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
    animations: [fadeInOut]
})

export class AddProjectComponent {
     projectData: FormGroup;
    public fileUploadProgress: number;
    public photoUploadProgress: number;
    public messagePhoto: string;
    public messageFile: string;
  
  private fileObject: any;
  private photoObject : any;

  @Output() public onUploadFinished = new EventEmitter();
    constructor(private router: Router, private http: HttpClient, private projectService: ProjectsService, private authService: AuthService) { }
  ngOnInit() {
    this.projectData = new FormGroup({
      author: new FormControl(),
      projectName: new FormControl(),
      shortDescription: new FormControl(),
      longDescription: new FormControl(),
  });

  }

    private headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken,
      Accept: 'application/json, text/plain, */*'
    });
 

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:44350/api/Upload/file', formData, { reportProgress: true, observe: 'events',headers:this.headers } )
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            {
              this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
            }
          else if (event.type === HttpEventType.Response) {
            this.onUploadFinished.emit(event.body);
            this.fileObject = event.body;
            this.messageFile = "Załadowano";
          }
        });
  };

  public uploadImage = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:44350/api/Upload/images', formData, { reportProgress: true, observe: 'events', headers: this.headers })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
        this.photoUploadProgress = Math.round(100 * event.loaded / event.total);
      }        
        else if (event.type === HttpEventType.Response) {
          this.onUploadFinished.emit(event.body);
          console.log(event.body);
          this.photoObject = (event.body as Image);
          this.messagePhoto = "Załadowano";
        }
      });
  };
  public create = () => {
   var project = new Project(this.projectData.controls.projectName.value,
      this.projectData.controls.author.value,
      this.projectData.controls.longDescription.value,
     this.projectData.controls.shortDescription.value);

    project.projectFile = new ProjectFile(this.fileObject.uploadedFile.id, 0, this.fileObject.uploadedFile.path);

    project.images = new Image(this.photoObject.uploadedImage.id, this.photoObject.uploadedImage.path);
      this.projectService.newProject(project).subscribe(r=>this.router.navigate(['home'])
  );

  }

}

