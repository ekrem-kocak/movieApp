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

  GetMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + 'movies.json').pipe(
      map(movies => {
        let newMovies: Movie[] = [];

        for (let key in movies) {
          newMovies.push({ ...movies[key], id: key })
        }

        return newMovies;
      })
    )
  }
}
