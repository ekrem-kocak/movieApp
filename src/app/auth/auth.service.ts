import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  SignUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  SignInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  Register(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.SignUpUrl + environment.ApiKey, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      tap(user => {
        let newUser = new User(user.idToken, user.email, user.refreshToken, user.expiresIn, user.localId);
        this.user.next(newUser);
      })
    )
  }

  Login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.SignInUrl + environment.ApiKey, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      tap(user => {
        let newUser = new User(user.idToken, user.email, user.refreshToken, user.expiresIn, user.localId);
        this.user.next(newUser);
      })
    )
  }

  AutoLogin() {
    let AutoLoginedUser = JSON.parse(localStorage.getItem('user'));

    if (!AutoLoginedUser) {
      this.router.navigate(["auth"]);
      return;
    }

    AutoLoginedUser.expiresIn = "3600";
    localStorage.setItem('user',JSON.stringify(AutoLoginedUser));

    this.user.next(AutoLoginedUser);
  }

}
