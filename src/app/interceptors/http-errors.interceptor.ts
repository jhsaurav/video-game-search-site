import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Observable,throwError } from "rxjs";
import{catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err) => {
                console.log(err);
                // return observableThrowError(err);
                 return throwError(() => err);  // FIXED
            })
        );
    }
}
