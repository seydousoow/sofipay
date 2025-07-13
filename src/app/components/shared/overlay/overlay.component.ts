import { Component, HostListener, output } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: '',
  styleUrl: './overlay.component.css',
})
export class OverlayComponent {
  readonly clicked = output<void>();

  @HostListener('click') click = () => this.clicked.emit();
}
