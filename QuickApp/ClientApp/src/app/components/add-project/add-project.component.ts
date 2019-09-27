import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ProjectsService } from "../../services/projects.service";
import { Project, ProjectFile } from "../../models/project";
import { Image } from "../../models/project";

@Component({
  selector: 'add-project',
    templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
    animations: [fadeInOut]
})

export class AddProjectComponent {
    private projectData: FormGroup;
    public fileUploadProgress: number;
    public photoUploadProgress: number;
  public messagePhoto: string;
  public messageFile: string;

  private fileObject: any;
  private photoObject : any;

  @Output() public onUploadFinished = new EventEmitter();
    constructor(private router: Router, private http: HttpClient,private projectService:ProjectsService) { }
  ngOnInit() {
    this.projectData = new FormGroup({
      author: new FormControl(),
      projectName: new FormControl(),
      shortDescription: new FormControl(),
      longDescription: new FormControl(),
  });

  }

  public uploadFile = (files,type:string) => {
    if (files.length === 0) {
      return;
    }
    console.log(type);

      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post('https://localhost:44350/api/Upload/file', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            {
              this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
            }
            
          else if (event.type === HttpEventType.Response) {
            this.onUploadFinished.emit(event.body);
            console.log(event.body);
            this.fileObject = event.body;
            this.messageFile = "Załadowano";
          }
        });
  };

  public uploadImage = (files, type: string) => {
    if (files.length === 0) {
      return;
    }
    console.log(type);

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:44350/api/Upload/images', formData, { reportProgress: true, observe: 'events' })
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
    console.log(this.projectData.controls);
   var project = new Project(this.projectData.controls.projectName.value,
      this.projectData.controls.author.value,
      this.projectData.controls.longDescription.value,
     this.projectData.controls.shortDescription.value);

    project.projectFile = new ProjectFile(this.fileObject.uploadedFile.id, 0, this.fileObject.uploadedFile.path);

    project.images = new Image(this.photoObject.uploadedImage.id, this.photoObject.uploadedImage.path);



   console.log(project);
    this.projectService.newProject(project).subscribe(Response => console.log(Response));
  }

}

