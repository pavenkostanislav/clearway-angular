import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DocumentData } from './types';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const docId = route.params['id'];

    if (!docId) {
      this.redirectTo404();
      return of(null);
    }

    return this.http.get<DocumentData>(`/assets/${docId}.json`).pipe(
      catchError((error) => {
        console.error('Error loading document:', error);
        this.redirectTo404();
        return of(null);
      })
    );;
  }

  private redirectTo404(): void {
    this.router.navigate(['/404'], {
      skipLocationChange: true // Переход на несуществующий путь /404 без изменения URL в адресной строке
    });
  }
}