import { Directive, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  private isDragging = false;
  private offset = { x: 0, y: 0 };

  // Принимаем ElementRef или HTMLElement
  @Input() dragHandle?: ElementRef<HTMLElement> | HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.setupStyles();
  }

  private setupStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const handleElement = this.getHandleElement();
    
    if (handleElement && !handleElement.contains(event.target as Node)) {
      return;
    }

    this.startDrag(event);
  }

  private getHandleElement(): HTMLElement | null {
    if (!this.dragHandle) return this.el.nativeElement;
    
    if (this.dragHandle instanceof ElementRef) {
      return this.dragHandle.nativeElement;
    }
    
    return this.dragHandle as HTMLElement;
  }

  private startDrag(event: MouseEvent) {
    this.isDragging = true;
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.offset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    this.renderer.setStyle(
      this.el.nativeElement, 
      'left', 
      `${event.clientX - this.offset.x}px`
    );
    this.renderer.setStyle(
      this.el.nativeElement, 
      'top', 
      `${event.clientY - this.offset.y}px`
    );
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
    }
  }
}