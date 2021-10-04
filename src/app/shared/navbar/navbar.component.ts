import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as $ from "jquery";

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
    this.authService.user.subscribe(user => {
      if (user) {
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

  Logout() {
    this.isAuthenticated = false;
    this.authService.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(["auth"]);
  }

  CloseMobileNav() {
    var mobileNavItems = $('.navbar-collapse');
    console.log(mobileNavItems);
    if (mobileNavItems.hasClass('show')) {
      mobileNavItems.removeClass('show').delay(10000);
    }
  }
}
