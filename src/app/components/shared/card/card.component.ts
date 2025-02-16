import { booleanAttribute, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-card, [appCard]',
  templateUrl: './card.component.html',
  host: {
    '[class]': '"rounded-xl dark:bg-gray-950 w-full mx-1 border-box"',
    '[class.mt-4]': 'topPadding()'
  }
})
export class CardComponent {
  readonly title: InputSignal<string | undefined> = input<string | undefined>(undefined);
  readonly topPadding = input(false, { transform: booleanAttribute });
}
