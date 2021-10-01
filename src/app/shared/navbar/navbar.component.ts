import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  searchForm = new FormGroup({
    searchText: new FormControl('',[Validators.required])
  })

  Search(){
    this.router.navigate([`/movies/search/${this.searchForm.value.searchText}`]);
  }
}
