import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
  }

  @Input() movie: Movie;
  @Input() myMovieList: string[];

  AddRemove(e: any, movie: Movie) {
    if (e.target.classList.contains('btn-success')) {
      e.target.classList.replace('btn-success', 'btn-danger');
      e.target.innerText = "Listeden Kaldır";

      this.movieService.AddToList(movie).subscribe(() => { }, err => console.log(err))
    } else {
      e.target.classList.replace('btn-danger', 'btn-success');
      e.target.innerText = "Listeye Ekle";
      this.movieService.RemoveFromList(movie).subscribe();
    }
  }

  ButtonState(): boolean {
    return this.myMovieList.includes(this.movie.id) ? true : false;
  }

}
