import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = "https://movieapp-b1366-default-rtdb.firebaseio.com/";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  CreateMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url + 'movies.json', movie);
  }

  GetMovies(categoryId?: string, searchText?: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + 'movies.json').pipe(
      map(movies => {
        if (categoryId) {
          let newMovies: Movie[] = [];

          for (let key in movies) {
            if (movies[key].categoryId == categoryId) {
              newMovies.push({ ...movies[key], id: key })
            }
          }

          return newMovies;
        } else if (searchText) {

          let newMovies: Movie[] = [];

          for (let key in movies) {
            if (movies[key].description.toLowerCase().includes(searchText.toLowerCase()) || movies[key].name.toLowerCase().includes(searchText.toLowerCase())) {
              newMovies.push({ ...movies[key], id: key })
            }
          }

          return newMovies;

        } else {
          let newMovies: Movie[] = [];

          for (let key in movies) {
            newMovies.push({ ...movies[key], id: key })
          }

          return newMovies;
        }
      })
    )
  }

  GetMovieById(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(this.url + 'movies/' + movieId + '.json').pipe(
      // id eklemek icin yapiliyor map islemi
      map(movie => {
        let mv: Movie = {
          id: movieId,
          name: movie.name,
          description: movie.description,
          imageUrl: movie.imageUrl,
          categoryId: movie.categoryId
        }

        return mv;
      })
    )
  }

  EditMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.url + 'movies/' + movie.id + '.json', movie);
  }

  DeleteMovie(movie: Movie): Observable<Movie> {
    return this.http.delete<Movie>(this.url + 'movies/' + movie.id + '.json');
  }

  AddToList(movie: Movie): Observable<Movie> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.post<Movie>(this.url + 'users/' + user.localId + '/myList/' + movie.id + '.json', { addedTime: new Date().getTime() });
      })
    )
  }

  RemoveFromList(movie: Movie): Observable<Movie> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.delete<Movie>(this.url + 'users/' + user.localId + '/myList/' + movie.id + '.json');
      })
    )
  }

  GetMyList(): Observable<string[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get(this.url + 'users/' + user.localId + '/myList.json').pipe(
          map(movies=>{
            let myList: string[] = [];
            for(let movieId in movies){
              myList.push(movieId);
            }
            return myList;
          })
        )
      })
    )
  }
}
