import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Page, DocumentData } from '../../document.service';

interface Annotation {
  id: string;
  text: string;
  position: { x: number; y: number };
  createdAt: Date;
}

@Component({
  selector: 'app-image-annotator',
  standalone: false,
  templateUrl: './image-annotator.html',
  styleUrl: './image-annotator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageAnnotator {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @Output() annotationChanged = new EventEmitter<Page>();
  @Input() currentPage: Page = { number: 1, imageUrl: 'pages/1.png' };
  @Input() zoomScale = 1.0; // коэффициент изменнение масштаба
  zoomLevel = 100; // масштаба в %
  zoomStep = 0.1;  // шаг

  document!: DocumentData;

  annotations: Annotation[] = [];
  newAnnotationText = '';
  isAddingAnnotation = false;
  currentPosition = { x: 0, y: 0 };

  constructor() { }

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
      const newLocal = {
        id: Date.now().toString(),
        text: this.newAnnotationText,
        position: { ...this.currentPosition },
        createdAt: new Date()
      };
      this.annotations.push(newLocal);
      this.annotationChanged.emit({...this.currentPage, annotations: this.annotations});
      this.cancelAddAnnotation();
    }
  }

  cancelAddAnnotation() {
    this.isAddingAnnotation = false;
    this.newAnnotationText = '';
  }

  deleteAnnotation(id: string) {
    this.annotations = this.annotations.filter(a => a.id !== id);
    this.annotationChanged.emit({...this.currentPage, annotations: this.annotations});
  }

  trackByAnnotationId(index: number, annotation: Annotation) {
    return annotation.id;
  }
}