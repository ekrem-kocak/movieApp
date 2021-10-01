import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CategoriesComponent,
    CategoryCreateComponent,
  ]
})
export class CategoriesModule { }
