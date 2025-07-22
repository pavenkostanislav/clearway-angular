// document.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DocumentData } from './types';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocument(docId: string): Observable<DocumentData> {
    if (!docId) {
      return throwError(() => new Error('Invalid document ID'));
    }

    return this.http.get<DocumentData>(`/assets/${docId}.json`).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
}