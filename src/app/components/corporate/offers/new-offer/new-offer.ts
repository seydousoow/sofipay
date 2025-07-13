import { Component, input, model, output } from '@angular/core';
import { Button } from 'primeng/button';
import { AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule, ɵTypedOrUntyped } from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { IOfferForm, OfferFormModel } from '../../../../core/model/offer-form.builder';
import { ISelectOption } from '../../../../core/model/select.model';
import { EChargeHolder, EDurationUnit, EFeeType, ERotationFrequency, ETruckType, EWeightUnit } from '../../../../core/model/offer.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroClock, heroRss, heroXMark } from '@ng-icons/heroicons/outline';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { addDays, addYears } from 'date-fns';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-new-offer',
  imports: [Button, FormsModule, IftaLabel, InputNumber, InputText, RadioButton, ReactiveFormsModule, Select, Textarea, NgIcon, InputGroup, InputGroupAddon, DatePicker],
  templateUrl: './new-offer.html',
  providers: [provideIcons({ heroRss, heroXMark, heroClock })],
})
export class NewOffer {
  readonly title = input.required<string>();
  readonly form!: FormGroup<IOfferForm>;
  readonly rotationFrequencies: ISelectOption<ERotationFrequency>[] = [
    { label: 'Quotidien', value: ERotationFrequency.DAILY },
    { label: 'Hebdomadaire', value: ERotationFrequency.WEEKLY },
    { label: 'Quinzaine', value: ERotationFrequency.BIWEEKLY },
    { label: 'Mensuel', value: ERotationFrequency.MONTHLY },
  ];

  readonly feeHolders: ISelectOption<EChargeHolder>[] = [
    { label: 'Transporteur', value: EChargeHolder.CUSTOMER },
    { label: 'Client', value: EChargeHolder.CORPORATE },
  ];

  readonly truckTypes: ISelectOption<ETruckType>[] = [
    { label: 'Camion-benne', value: ETruckType.DUMP_TRUCK },
    { label: 'Camion-citerne', value: ETruckType.TANK_TRUCK },
    { label: 'Camion Tautliner', value: ETruckType.CURTAINSIDE_TRUCK },
    { label: 'Camion semi-remorque', value: ETruckType.SEMI_TRAILER_TRUCK },
    { label: 'Camion frigorifique', value: ETruckType.REFRIGERATED_TRUCK },
    { label: 'Camion plateau', value: ETruckType.FLATBED_TRUCK },
    { label: 'Camion fourgon', value: ETruckType.BOX_TRUCK },
    { label: 'Camion porte-char', value: ETruckType.EQUIPMENT_CARRIER },
  ];

  readonly durationUnits: ISelectOption<EDurationUnit>[] = [
    { label: 'Heures', value: EDurationUnit.HOURS },
    { label: 'Jours', value: EDurationUnit.DAYS },
    { label: 'Semaines', value: EDurationUnit.WEEKS },
    { label: 'Mois', value: EDurationUnit.MONTHS },
    { label: 'Années', value: EDurationUnit.ANNUALS },
    { label: 'Non définie', value: EDurationUnit.INDEFINITE },
  ];

  readonly capacityUnit: ISelectOption<EWeightUnit>[] = [
    { label: 'Tonne', value: EWeightUnit.TON },
    { label: 'Litre', value: EWeightUnit.L },
  ];

  readonly deadLineLimitDate: Record<'from' | 'to', Date> = {
    from: addDays(new Date(), 1),
    to: addYears(new Date(), 2),
  };

  readonly isMobile = window.innerWidth <= 768;
  readonly selectedOffer = model<any>(undefined);
  readonly cancel = output<void>();
  private readonly builder = new OfferFormModel();

  constructor() {
    this.form = this.builder.buildForm();
    console.log(this.form.controls.fees);
  }

  get f(): ɵTypedOrUntyped<IOfferForm, IOfferForm, { [p: string]: AbstractControl }> {
    return this.form.controls;
  }

  get productAddedSubtitle(): string {
    const productCount = this.f.products.value.length;
    if (productCount === 0) {
      return 'Aucun produit ajouté';
    }
    const suffix = productCount > 1 ? 's' : '';
    return `${productCount} produit${suffix} ajouté${suffix}`;
  }

  get truckAddedSubtitle(): string {
    const count = this.f.truckCategories.value.length;
    if (count === 0) {
      return 'Aucun véhicule ajouté';
    }
    const suffix = count > 1 ? 's' : '';
    return `${count} véhicule${suffix} ajouté${suffix}`;
  }

  public addElement(controlName: 'products' | 'truckCategories'): void {
    let data: FormGroup;
    if (controlName === 'products') {
      data = this.builder.createProduct();
    } else {
      data = this.builder.createTruckCategory();
    }
    (<FormArray>this.form.get(controlName)).push(data);
  }

  public removeElement(controlName: 'products' | 'truckCategories', index: number): void {
    (<FormArray>this.form.get(controlName)).removeAt(index);
  }

  public getProductQuantitySuffix(unit: EWeightUnit): string {
    return this.capacityUnit.find((s) => s.value === unit)?.label ?? '';
  }

  public createOffer(): void {
    console.log(this.form.getRawValue());
  }

  public cancelOffer(): void {
    console.log(this.form.getRawValue());
    this.form.reset();
    this.cancel.emit();
  }

  public translateFee(title: EFeeType): string {
    if (title === EFeeType.FUEL) {
      return 'Frais de carburant';
    } else if (title === EFeeType.TRAVEL) {
      return 'Frais de transport';
    }
    return '';
  }
}
