import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  selectedMovie: Movie;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params) {
        this.movieService.GetMovieById(params.id).subscribe(movie => {
          this.selectedMovie = movie;
        })
      }
    })
  }

  AddToList(e: any, movie: Movie) {
    if(e.target.classList.contains('btn-success')){
      e.target.classList.replace('btn-success','btn-danger');
      e.target.innerText = "Listeden Kaldır";

      // this.movieService.AddToList(movie);
    }else{
      e.target.classList.replace('btn-danger','btn-success');
      e.target.innerText = "Listeye Ekle";
      // this.movieService.RemoveFromList(movie);
    }
  }

}
