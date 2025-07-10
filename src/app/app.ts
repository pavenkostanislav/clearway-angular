import { FormsModule } from '@angular/forms';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';

interface Annotation {
  id: string;
  text: string;
  position: { x: number; y: number };
  createdAt: Date;
  color?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  imageUrl: string = 'assets/pages/1.png';
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  zoomLevel = 100; // масштаба в %
  zoomScale = 1.0; // коэффициент изменнение масштаба
  zoomStep = 0.1;  // шаг


  annotations: Annotation[] = [];
  newAnnotationText = '';
  isAddingAnnotation = false;
  currentPosition = { x: 0, y: 0 };
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];
  selectedColor = this.colors[0];

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
        createdAt: new Date(),
        color: this.selectedColor
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
    // Отправить на сервер или сохранить локально
  };

  loadAnnotations(annotations: Annotation[]) {
    this.annotations = annotations;
  };

  // Увеличить масштаб
  zoomIn() {
    this.zoomLevel += 10;
    this.zoomScale += this.zoomStep;
  }

  // Уменьшить масштаб
  zoomOut() {
    if (this.zoomLevel > 30) { // Минимальный масштаб 30%
      this.zoomLevel -= 10;
      this.zoomScale -= this.zoomStep;
    }
  }

  // Сбросить масштаб
  resetZoom() {
    this.zoomLevel = 100;
    this.zoomScale = 1.0;
  }
}