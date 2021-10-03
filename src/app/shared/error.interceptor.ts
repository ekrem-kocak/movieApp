import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage: string[] = [];

        if(!navigator.onLine){
          errorMessage.push("İnternet bağlantınız yok.");
        }
        console.log(err);
        switch(err.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage.push("Bu email adresi daha once kullanılmış.");
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage.push('Bu email adresine kayıtlı bir hesap yok');
            break;
          case 'INVALID_PASSWORD':
            errorMessage.push('Girilen şifre yanlış');
            break;
          default:
            errorMessage.push('Bilinmeyen bir hata oluştu');
        }

        return throwError(errorMessage);
      })
    )
  }
}
