import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { _throw } from 'rxjs/observable/throw';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}

    public getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if ( err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return _throw(errorMessage);
    }
}
