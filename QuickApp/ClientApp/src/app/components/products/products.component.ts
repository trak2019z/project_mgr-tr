import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ProjectsService } from "../../services/projects.service";
import { Project } from "../../models/project";

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    animations: [fadeInOut]
})

export class ProductsComponent {
    private projectData: FormGroup;
    public fileUploadProgress: number;
    public photoUploadProgress: number;
  public messagePhoto: string;
  public messageFile: string;
]

  @Output() public onUploadFinished = new EventEmitter();
    constructor(private router: Router, private http: HttpClient,private projectService:ProjectsService) { }
  ngOnInit() {
    this.projectData = new FormGroup({
      author: new FormControl(),
      projectname: new FormControl(),
      shortDescription: new FormControl(),
      longDescription: new FormControl(),
      photos: new FormControl(),
      projectFiles: new FormControl()
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
      this.http.post('https://localhost:44350/api/Upload/upload', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            switch (type) {
            case "Project":
            {
              this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
              break;
            }
            case "Photos":
            {
              this.photoUploadProgress = Math.round(100 * event.loaded / event.total);
              break;
            }
            }
          else if (event.type === HttpEventType.Response) {
            this.onUploadFinished.emit(event.body);
            console.log(event.body);
            switch (type) {
            case "Photos":
            {
              this.messagePhoto = "Załadowano";
              break;
            }
            case "Project":
            {
              this.messageFile = "Załadowano";
              break;
            }
            }
          }
        });
  };
  public create = () => {
    console.log(this.projectData.controls);
    // this.projectService.newProject((new Project());
  }

}

