import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieComponent } from './movie/movie.component';



@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailComponent,
    MovieCreateComponent,
    MovieComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MoviesModule { }
