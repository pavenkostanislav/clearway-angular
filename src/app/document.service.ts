import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Annotation {
  id: string;
  text: string;
  position: { x: number; y: number };
  createdAt: Date;
}

export interface Page {
  number: number;
  imageUrl: string;
  annotations?: Annotation[]
}

export interface DocumentData {
  name: string;
  pages: Page[];
}

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
  private readonly docUrl = '/assets/1.json';

  constructor(private http: HttpClient) {}

  getDocument(): Observable<DocumentData> {
    return this.http.get<DocumentData>(this.docUrl);
  }
}