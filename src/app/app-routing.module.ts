import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { MyListComponent } from './movies/my-list/my-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies/mylist', component: MyListComponent },
  { path: 'movies/create', component: MovieCreateComponent },
  { path: 'movies', loadChildren: () => import('../app/movies/movies.module').then(mod => mod.MoviesModule) },
  { path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(mod => mod.AuthModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
