import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  editState: boolean = false;
  selectedCategory: Category;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.GetCategories().subscribe(ctgs => {
      this.categories = ctgs;
    })
  }

  categoryEditForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  EditCategory() {
    this.categoryService.EditCategory({
      id: this.selectedCategory.id,
      name: this.categoryEditForm.value.name
    }).subscribe(() => {
      window.location.reload();
    })
  }

  DeleteCategory(ctg:Category){
    this.categoryService.DeleteCategory(ctg).subscribe(()=>{
      window.location.reload();
    })
  }

  selectEditingCategoryName(category: Category) {
    this.editState = true;
    this.selectedCategory = category;
    this.categoryEditForm.get('name').setValue(category.name);
  }

}
