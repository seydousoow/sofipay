import { Component, computed, signal, Signal } from '@angular/core';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { InputText } from 'primeng/inputtext';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule, ɵTypedOrUntyped } from '@angular/forms';
import { IOfferForm, OfferFormModel } from '../../../core/model/offer-form.builder';
import { Textarea } from 'primeng/textarea';
import { IftaLabel } from 'primeng/iftalabel';
import { InputNumber } from 'primeng/inputnumber';
import { ERotationFrequency, ETruckType, EWeightUnit } from '../../../core/model/offer.model';
import { Select } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { ISelectOption } from '../../../core/model/select.model';

@Component({
  selector: 'app-offers',
  imports: [PageHeaderComponent, Button, DialogComponent, InputText, ReactiveFormsModule, Textarea, IftaLabel, InputNumber, Select, RadioButton],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  readonly showDialog = signal<boolean>(false);
  readonly form!: FormGroup<IOfferForm>;
  readonly rotationFrequencies: ISelectOption<ERotationFrequency>[] = [
    { label: 'Quotidien', value: ERotationFrequency.DAILY },
    { label: 'Hebdomadaire', value: ERotationFrequency.WEEKLY },
    { label: 'Quinzaine', value: ERotationFrequency.BIWEEKLY },
    { label: 'Mensuel', value: ERotationFrequency.MONTHLY }
  ];
  readonly truckTypes: ISelectOption<ETruckType>[] = [
    { label: 'Camion-benne', value: ETruckType.DUMP_TRUCK },
    { label: 'Camion-citerne', value: ETruckType.TANK_TRUCK },
    { label: 'Camion Tautliner', value: ETruckType.CURTAINSIDE_TRUCK },
    { label: 'Camion semi-remorque', value: ETruckType.SEMI_TRAILER_TRUCK },
    { label: 'Camion frigorifique', value: ETruckType.REFRIGERATED_TRUCK },
    { label: 'Camion plateau', value: ETruckType.FLATBED_TRUCK },
    { label: 'Camion fourgon', value: ETruckType.BOX_TRUCK },
    { label: 'Camion porte-char', value: ETruckType.EQUIPMENT_CARRIER }
  ];
  readonly capacityUnit: ISelectOption<EWeightUnit>[] = [
    { label: 'Tonne', value: EWeightUnit.TON }, { label: 'Litre', value: EWeightUnit.L }
  ];

  private readonly selectedOffer = signal<any>(undefined);
  readonly title: Signal<string> = computed((): string => {
    if (!this.showDialog()) return '';
    if (this.selectedOffer() !== undefined) return 'Détails de l\'appel d\'offre';
    return 'Nouvelle appel d\'offre';
  });
  private readonly builder = new OfferFormModel();

  constructor() {
    this.form = this.builder.buildForm();
  }

  get f(): ɵTypedOrUntyped<IOfferForm, IOfferForm, { [p: string]: AbstractControl }> {
    return this.form.controls;
  }

  displayDialog(): void {
    this.showDialog.set(true);
  }

  addElement(controlName: 'products' | 'requirements' | 'truckCategories'): void {
    let data: FormGroup;
    if (controlName === 'products') {
      data = this.builder.createProduct();
    } else if (controlName === 'requirements') {
      data = this.builder.createRequirement();
    } else {
      data = this.builder.createTruckCategory();
    }
    (<FormArray<any>>this.form.get(controlName)).push(data);
  }

  removeElement(controlName: 'products' | 'requirements' | 'truckCategories', index: number): void {
    (<FormArray<any>>this.form.get(controlName)).removeAt(index);
  }

  cancelAction(): void {
    console.log(this.form.getRawValue());
    this.form.reset();
    this.selectedOffer.set(undefined);
  }

  createOffer(): void {
    console.log(this.form.getRawValue());
  }

  getProductQuantitySuffix(unit: EWeightUnit): string {
    return this.capacityUnit.find(s => s.value === unit)?.label ?? '';
  }
}
