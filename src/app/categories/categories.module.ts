import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories.component';
import { AuthGuard } from '../auth/auth.guard';



@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'category/create', component: CategoryCreateComponent, canActivate: [AuthGuard] },
    ])
  ],
  exports: [
    CategoriesComponent,
    CategoryCreateComponent,
  ]
})
export class CategoriesModule { }
