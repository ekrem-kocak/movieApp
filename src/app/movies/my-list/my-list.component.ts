import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  allMovies: Movie[] = [];
  myListMovies: Movie[] = [];
  loading: boolean = false;

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.movieService.GetMovies().subscribe(movies => {
      if (movies) {
        this.movieService.GetMyList().subscribe(myListMoviesId => {
          for (let key in movies) {
            if (myListMoviesId.includes(movies[key].id)) {
              this.myListMovies.push(movies[key]);
            }
          }
          this.loading = false;
        })
      } else {
        this.loading = false;
      }
    })
  }

  RemoveFromList(movie: Movie) {
    this.movieService.RemoveFromList(movie).subscribe(() => {
      this.myListMovies.splice(this.myListMovies.indexOf(movie), 1);
    });
  }

}
