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

  currentCategoriesNames: string[] = [];
  errorMessage: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.GetCategories().subscribe(ctgs => {
      ctgs.forEach(ctg => {
        this.currentCategoriesNames.push(ctg.name.toLowerCase());
      });
    })
  }

  categoryCreateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  CreateCategory() {
    if (this.currentCategoriesNames.includes(this.categoryCreateForm.value.name.toLowerCase())) {
      this.errorMessage = "Bu kategori daha önce eklenmiş";
      return;
    }
    this.categoryService.CreateCategory({
      id: '0',
      name: this.categoryCreateForm.value.name
    }).subscribe(() => {
      this.router.navigate(["/movies"]);
    }, err => console.log(err))
  }

}
