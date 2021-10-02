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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, StudentEmailValidator]),
    password: new FormControl('', [Validators.required])
  })

  Auth() {
    if (this.LoginRegisterState) {
      //login
    } else {
      this.authService.Register(this.authForm.value.email, this.authForm.value.password).subscribe(res => {
        this.router.navigate([""]);
      }, err => console.log(err))
    }
  }
}
