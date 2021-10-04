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
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { MyListComponent } from './my-list/my-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailComponent,
    MovieCreateComponent,
    MovieComponent,
    MoviesHomeComponent,
    MovieEditComponent,
    MyListComponent
  ],
  imports: [
    CommonModule,
    CategoriesModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: MoviesHomeComponent, canActivate: [AuthGuard], children: [
          { path: '', component: MoviesComponent },
          { path: ':id', component: MovieDetailComponent },
          { path: 'category/:id', component: MoviesComponent },
          { path: 'search/:text', component: MoviesComponent },
          { path: 'edit/:id', component: MovieEditComponent },
        ]
      },
    ])
  ],
  exports: [
    MoviesComponent,
    MovieDetailComponent,
    MovieCreateComponent,
    MovieComponent,
    MovieEditComponent,
  ]
})
export class MoviesModule { }
