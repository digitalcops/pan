import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()

export class AppInterceptor implements HttpInterceptor {
    constructor(
        public router: Router,
        public appService: AppService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.appService.showLoader(true);
        let requestToHandle = null;
        const authToken = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')).token : '';

        if (request.url.includes("?mlsid")) {
            requestToHandle = request;
        }
        else {
            requestToHandle = authToken
                ? request.clone({
                    headers: request.headers.set('Authorization', `JWT ${authToken}`)
                })
                : request;
        }
        return next.handle(requestToHandle).pipe(tap((event: HttpEvent<any>) => {
            if ((event instanceof HttpResponse) && (event.status && (event.status === 200 || 201))) {
                    setTimeout(() => {
                        this.appService.showLoader(false);
                    }, 1000);
            }
        }, (error) => {
            this.appService.showLoader(false);
            if (error.status === 401 && !error.url.includes("google")) {
                localStorage.clear();
                this.router.navigate(['/login']);
            } else {
                return throwError(error);
            }
        }));
    }
}


