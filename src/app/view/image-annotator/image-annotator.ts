import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';

import { Page, DocumentData, Annotation } from '../../types';

@Component({
  selector: 'app-image-annotator',
  standalone: false,
  templateUrl: './image-annotator.html',
  styleUrl: './image-annotator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageAnnotator {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('textInput', { static: false }) textInput!: MatInput;
  @Output() annotationChanged = new EventEmitter<Page>();
  @Input() currentPage: Page = { number: 1, imageUrl: 'pages/1.png' };
  @Input() zoomScale = 1.0; // коэффициент изменнение масштаба
  zoomLevel = 100; // масштаба в %
  zoomStep = 0.1;  // шаг

  imageUrl: string | null = null;
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
      this.pushAnnotation(this.newAnnotationText);
      this.cancelAddAnnotation();
    }
  }

  private pushAnnotation(text: string, blob?: File | null) {
    const data = {
      id: Date.now().toString(),
      text,
      position: { ...this.currentPosition },
      createdAt: new Date(),
      blob
    };
    this.annotations.push(data);
    this.annotationChanged.emit({ ...this.currentPage, annotations: this.annotations });
  }

  cancelAddAnnotation() {
    this.isAddingAnnotation = false;
    this.newAnnotationText = '';
  }

  deleteAnnotation(id: string) {
    this.annotations = this.annotations.filter(a => a.id !== id);
    this.annotationChanged.emit({ ...this.currentPage, annotations: this.annotations });
  }

  trackByAnnotationId(index: number, annotation: Annotation) {
    return annotation.id;
  }


  handlePaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    if (clipboardData && clipboardData.items) {
      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.type.indexOf('image') !== -1) {
          event.preventDefault();
          const blob = item.getAsFile();
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
            this.pushAnnotation(e.target.result, blob);
          };

          if (blob) {
            reader.readAsDataURL(blob);
          }
          break;
        }
      }
    }
  }
}