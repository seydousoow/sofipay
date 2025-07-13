import { Component, computed, signal } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Button } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NewOffer } from './new-offer/new-offer'
import { ModalComponent } from '../../shared/modal/modal.component'

@Component({
  selector: 'app-offers',
  imports: [PageHeader, Button, ReactiveFormsModule, NewOffer, ModalComponent],
  templateUrl: './offers.html',
  styleUrl: './offers.css'
})
export class Offers {

  readonly creationFormValidity = signal<boolean>(false);
  readonly showCreationDialog = signal<boolean>(true);
  readonly selectedOffer = signal<any>(undefined);

  readonly modalTitle = computed((): string => {
    if (!this.showCreationDialog()) return '';
    if (this.selectedOffer() !== undefined) return 'Détails de l\'appel d\'offre';
    return 'Nouvelle appel d\'offre';
  });

}
