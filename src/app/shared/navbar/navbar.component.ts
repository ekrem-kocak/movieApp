import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      if(user){
        console.log("calisti");
        this.isAuthenticated = true;
      }
    })
  }

  searchForm = new FormGroup({
    searchText: new FormControl('', [Validators.required])
  })

  Search() {
    this.router.navigate([`/movies/search/${this.searchForm.value.searchText}`]);
  }
}
