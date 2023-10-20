import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    if (req.url.includes('http://localhost:8080/login')) {
        return next.handle(req);
      }
    // Get the token from localStorage
    const token = localStorage.getItem('token');
 console.log(token);
    // If a token exists, add it to the Authorization header
    if (token) {
      req = req.clone({
        setHeaders: {
        
          Authorization: `Bearer ${token}`
         
        }
      });
    }
    
    return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.router.navigate(['/login']); // Redirect to the login page on a 403 error
          }
          return throwError(error);
        })
      );
  }
}
