import { Component } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    animations: [fadeInOut]
})
export class ProductsComponent {
  private projectData: FormGroup;
  constructor(private router: Router) { }
  ngOnInit() {
    this.projectData = new FormGroup({
    });
  }


}
