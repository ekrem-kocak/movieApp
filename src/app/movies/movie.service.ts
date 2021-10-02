import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = "https://movieapp-b1366-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) { }

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

  GetMovieById(movieId: string):Observable<Movie>{
    return this.http.get<Movie>(this.url + 'movies/' + movieId + '.json');
  }
}
