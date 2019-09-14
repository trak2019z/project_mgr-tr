import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    animations: [fadeInOut]
})
export class ProductsComponent {
    private projectData: FormGroup;
    public progress: number;
    public message: string;
    @Output() public onUploadFinished = new EventEmitter();
    constructor(private router: Router, private http: HttpClient) { }
  ngOnInit() {
    this.projectData = new FormGroup({
    });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post('https://localhost:44350/api/Upload/upload', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Sukces';
            this.onUploadFinished.emit(event.body);
          }
        });
  }
}
