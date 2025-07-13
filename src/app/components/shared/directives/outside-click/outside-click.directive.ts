import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';

@Directive({
  selector: '[AppOutsideClick]',
})
export class OutsideClickDirective {
  @Output() outsideClick = new EventEmitter<MouseEvent>();

  private readonly elementRef = inject(ElementRef);

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target) && !document.getElementsByClassName('cdk-overlay-pane').length) {
      this.outsideClick.emit(event);
    }
  }
}
