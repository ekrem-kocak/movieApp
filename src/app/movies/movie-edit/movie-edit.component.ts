import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { ImageUrlValidators } from '../imageUrlExtension.validators';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {

  editingMovie: Movie;
  categories: Category[];
  loading: boolean = false;

  movieImage: string;

  editMovieForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
    categoryId: new FormControl(''),
  })

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.GetCategories().subscribe(ctgs => {
      this.categories = ctgs;
    })

    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      if (params.id) {
        this.movieService.GetMovieById(params.id).subscribe(movie => {
          console.log(movie);
          this.editingMovie = movie;

          this.editMovieForm = new FormGroup({
            name: new FormControl(movie.name, [Validators.required, Validators.minLength(5)]),
            description: new FormControl(movie.description, [Validators.required, Validators.minLength(10)]),
            imageUrl: new FormControl(movie.imageUrl, [Validators.required, ImageUrlValidators]),
            categoryId: new FormControl(movie.categoryId, [Validators.required]),
          })

          this.movieImage = movie.imageUrl;
        })
      }
      this.loading = false;
    })
  }

  EditMovie() {
    this.categoryService.GetCategoryNameById(this.editMovieForm.value.categoryId).subscribe(ctgName => {
      const editedMovie: Movie = {
        id: this.editingMovie.id,
        name: this.editMovieForm.value.name,
        description: this.editMovieForm.value.description,
        imageUrl: this.editMovieForm.value.imageUrl,
        categoryId: this.editMovieForm.value.categoryId,
        categoryName: ctgName
      }
      this.movieService.EditMovie(editedMovie).subscribe(() => {
        console.log(editedMovie.id);
        this.router.navigate([`movies/${editedMovie.id}`])
      })
    })

  }

  DeleteMovie() {
    this.movieService.DeleteMovie(this.editingMovie).subscribe(() => {
      this.router.navigate(["/movies"]);
    })
  }

}
