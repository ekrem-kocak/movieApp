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

  selectedMovie: Movie = { name: '', description: '', imageUrl: '', categoryId: '', categoryName: '' };
  myList: string[] = [];

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

    this.movieService.GetMyList().subscribe(myList => {
      this.myList = myList;
    })
  }

  AddRemove(e: any, movie: Movie) {
    if (e.target.classList.contains('btn-success')) {
      e.target.classList.replace('btn-success', 'btn-danger');
      e.target.innerText = "Listeden Kaldır";

      this.movieService.AddToList(movie).subscribe();
    } else {
      e.target.classList.replace('btn-danger', 'btn-success');
      e.target.innerText = "Listeye Ekle";
      this.movieService.RemoveFromList(movie).subscribe();
    }
  }

  ButtonState(): boolean {
    return this.myList.includes(this.selectedMovie.id) ? true : false;
  }

}
