import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'category/create', component: CategoryCreateComponent },
    ])
  ],
  exports: [
    CategoriesComponent,
    CategoryCreateComponent,
  ]
})
export class CategoriesModule { }
