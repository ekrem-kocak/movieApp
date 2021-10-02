import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

  constructor(
    private http: HttpClient
  ) { }

  Register(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + environment.ApiKey, {
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
}
