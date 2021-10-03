import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../categories/category.model';
import { CategoryService } from '../categories/category.service';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  loading: boolean = false;

  myList: string[] = [];
  categories: Category[];

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.categoryService.GetCategories().subscribe(ctgs => {
      this.categories = ctgs;
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      if (params) {
        this.movieService.GetMovies(params.id, params.text).subscribe(movies => {
          this.movies = movies;
          this.loading = false;
        })
      } else {
        this.movieService.GetMovies().subscribe(movies => {
          this.movies = movies;
          this.loading = false;
        })
      }
    })

    this.movieService.GetMyList().subscribe(myListItems => {
      this.myList = myListItems;
    }, err => console.log(err))
  }


}
