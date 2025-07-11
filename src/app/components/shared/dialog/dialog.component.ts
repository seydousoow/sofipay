import { booleanAttribute, Component, input, InputSignal, model, ModelSignal, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dialog',
  imports: [
    Dialog,
    Button
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  readonly visible: ModelSignal<boolean> = model.required<boolean>();
  readonly title: InputSignal<string> = input.required<string>();

  readonly valid = input(true, { transform: ((v: any) => booleanAttribute(v)) });
  readonly showConfirmButton = input(false, { transform: ((v: any) => booleanAttribute(v)) });

  readonly confirmButtonLabel: InputSignal<string> = input<string>('Confirmer');
  readonly cancelButtonLabel: InputSignal<string> = input<string>('Annuler');

  readonly onConfirm = output<void>();
  readonly onCancel = output<void>();

  protected confirm() {
    console.log('confirm');
    this.closeDialog();
    this.onConfirm.emit();
  }

  protected cancel() {
    console.log('cancel');
    this.closeDialog();
    this.onCancel.emit();
  }

  protected closeDialog(): void {
    this.visible.set(false);
  }
}
