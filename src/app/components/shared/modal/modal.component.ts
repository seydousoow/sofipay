import { booleanAttribute, Component, input, model, output } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { NgClass } from '@angular/common';
import { OutsideClickDirective } from '../directives/outside-click/outside-click.directive';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'app-modal',
  imports: [OverlayComponent, NgIcon, NgClass, OutsideClickDirective, CdkTrapFocus],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  viewProviders: [provideIcons({ heroXMark })]
})
export class ModalComponent {
  readonly opened = model<boolean>(false);
  readonly sizeClass = input('sm:max-w-lg');
  readonly horizontalAlignment = input<'center' | 'start' | 'end'>('center');
  readonly verticalAlignment = input<'center' | 'start' | 'end'>('center');
  readonly xDismissible = input(true, { transform: booleanAttribute });
  readonly overlayDismissible = input(true, { transform: booleanAttribute });
  readonly closed = output<void>();

  open(): void {
    this.opened.set(true);
  }

  close(emit = true): void {
    this.opened.set(false);
    if (emit) {
      this.closed.emit();
    }
  }
}
