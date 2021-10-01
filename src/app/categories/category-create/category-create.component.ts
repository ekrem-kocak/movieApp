import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {


  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  categoryCreateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  CreateCategory() {
    this.categoryService.CreateCategory({
      id: '0',
      name: this.categoryCreateForm.value.name
    }).subscribe(() => {
      this.router.navigate(["/movies"]);
    }, err => console.log(err))
  }

}
