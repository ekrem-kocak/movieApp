import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieComponent } from './movie/movie.component';
import { CategoriesModule } from '../categories/categories.module';
import { RouterModule } from '@angular/router';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies.component';



@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailComponent,
    MovieCreateComponent,
    MovieComponent,
    MoviesHomeComponent
  ],
  imports: [
    CommonModule,
    CategoriesModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'movies', component: MoviesHomeComponent, children: [
          { path: '', component: MoviesComponent },
          { path: 'create', component: MovieCreateComponent },
          { path: ':id', component: MoviesComponent },
          { path: 'category/:id', component: MoviesComponent },
          { path: 'edit/:id', component: MoviesComponent },
        ]
      }
    ])
  ],
  exports: [
    MoviesComponent,
    MovieDetailComponent,
    MovieCreateComponent,
    MovieComponent,
  ]
})
export class MoviesModule { }
