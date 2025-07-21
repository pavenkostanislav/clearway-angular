import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DocumentService, Page, DocumentData } from '../document.service';

interface Annotation {
  id: string;
  text: string;
  position: { x: number; y: number };
  createdAt: Date;
}

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrl: './view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class View implements OnInit {
  document!: DocumentData;
  currentPage: Page = { number: 1, imageUrl: 'pages/1.png' };
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  zoomLevel = 100; // масштаба в %
  zoomScale = 1.0; // коэффициент изменнение масштаба
  zoomStep = 0.1;  // шаг


  annotations: Annotation[] = [];
  newAnnotationText = '';
  isAddingAnnotation = false;
  currentPosition = { x: 0, y: 0 };

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.documentService.getDocument().subscribe((data: DocumentData) => {
      if (!data) return;

      this.document = data;

      const pageId = +this.route.snapshot.paramMap.get('id')!;
      this.currentPage = this.document.pages.find(p => p.number === pageId)!;
      this.cdr.detectChanges();
    });
  }

  startAddAnnotation(event: MouseEvent) {
    const rect = this.imageContainer.nativeElement.getBoundingClientRect();
    this.currentPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    this.isAddingAnnotation = true;
  }

  addAnnotation() {
    if (this.newAnnotationText.trim()) {
      this.annotations.push({
        id: Date.now().toString(),
        text: this.newAnnotationText,
        position: { ...this.currentPosition },
        createdAt: new Date()
      });
      this.cancelAddAnnotation();
    }
  }

  cancelAddAnnotation() {
    this.isAddingAnnotation = false;
    this.newAnnotationText = '';
  }

  deleteAnnotation(id: string) {
    this.annotations = this.annotations.filter(a => a.id !== id);
  }

  trackByAnnotationId(index: number, annotation: Annotation) {
    return annotation.id;
  }

  saveAnnotations() {
    console.log(this.currentPage.imageUrl, ...this.annotations.map(a => a.text));
  };

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

  resetZoom() {
    this.zoomLevel = 100;
    this.zoomScale = 1.0;
  }
}