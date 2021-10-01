import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  selectedCategoryId: string;
  DisplayAll: boolean = true;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.GetCategories().subscribe(ctgs => {
      this.categories = ctgs;
    })
  }

  SelectCategory(ctgId: string){
    this.selectedCategoryId = ctgId;
    this.DisplayAll = false;
  }



}
