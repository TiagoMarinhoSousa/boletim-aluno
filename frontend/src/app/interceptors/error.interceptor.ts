import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from '../models/error-response.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorResponse: ErrorResponse = error.error;
        let displayMessage = 'Ocorreu um erro inesperado.';

        if (errorResponse?.message) {
          displayMessage = errorResponse.message;
        } else if (error.message) {
          displayMessage = error.message;
        }

        this.snackBar.open('✗ ' + displayMessage, 'Fechar', {
          duration: 7000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-erro'],
        });

        return throwError(() => error);
      })
    );
  }
}
