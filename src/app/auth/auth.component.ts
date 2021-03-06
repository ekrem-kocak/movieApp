import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StudentEmailValidator } from './email.validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  LoginRegisterState: boolean = true; // true = login
  errorMessage: String[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, StudentEmailValidator]),
    password: new FormControl('', [Validators.required,Validators.minLength(5),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)])
  })

  Auth() {
    if (this.LoginRegisterState) {
      this.authService.Login(this.authForm.value.email, this.authForm.value.password).subscribe(user => [
        localStorage.setItem('user', JSON.stringify(user)),
        this.router.navigate([""])
      ], err => this.errorMessage = err)

    } else {
      this.authService.Register(this.authForm.value.email, this.authForm.value.password).subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user)),
        this.router.navigate([""]);
      }, err => this.errorMessage = err)
    }
  }
}
