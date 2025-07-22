import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DocumentService, Page, DocumentData, Annotation } from '../document.service';



@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrl: './view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class View implements OnInit {
  document!: DocumentData;
  newDocument!: DocumentData;
  annotations: Annotation[] = [];

  zoomLevel = 100; // масштаба в %
  zoomScale = 1.0; // коэффициент изменнение масштаба
  zoomStep = 0.1;  // шаг

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.documentService.getDocument().subscribe((data: DocumentData) => {
      if (!data) return;

      this.document = data;
      this.newDocument = data;
      //const pageId = +this.route.snapshot.paramMap.get('id')!;
      this.cdr.detectChanges();
    });
  }

  zoomIn() {
    this.zoomLevel += 10;
    this.zoomScale += this.zoomStep;
  }

  zoomOut() {
    if (this.zoomLevel > 30) { // Минимальный масштаб 30%
      this.zoomLevel -= 10;
      this.zoomScale -= this.zoomStep;
    }
  }

  annotation(page: Page) {
    this.newDocument = {
      ...this.newDocument,
      pages: this.newDocument.pages.map(p => p.number === page.number ? page : p)
    };
  }

  saveAnnotations() {
    console.log(this.newDocument);
  };

}