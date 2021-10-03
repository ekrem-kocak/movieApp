import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { ImageUrlValidators } from '../imageUrlExtension.validators';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {

  categories: Category[];
  movieImage: string;

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.GetCategories().subscribe(ctgs => {
      this.categories = ctgs;
    })

  }

  createMovieForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    imageUrl: new FormControl('', [Validators.required, ImageUrlValidators]),
    categoryId: new FormControl('', [Validators.required]),
  })

  CreateMovie() {
    this.categoryService.GetCategoryNameById(this.createMovieForm.value.categoryId).subscribe(ctgName => {
      this.movieService.CreateMovie({
        name: this.createMovieForm.value.name,
        description: this.createMovieForm.value.description,
        imageUrl: this.createMovieForm.value.imageUrl,
        categoryId: this.createMovieForm.value.categoryId,
        categoryName: ctgName,
      }).subscribe(() => {
        this.router.navigate(["movies"]);
      })
    })

  }



}
