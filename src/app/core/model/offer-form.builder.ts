import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EChargeHolder, EDurationUnit, EFeeType, EOfferStatus, EPaymentFrequency, EPaymentMethod, ERotationFrequency, ETruckType, EWeightUnit } from './offer.model';
import { addDays } from 'date-fns';

export class OfferFormModel {
  buildForm(): FormGroup<IOfferForm> {
    return new FormGroup<IOfferForm>({
      id: new FormControl(null),

      title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),

      creationUser: new FormControl(null),
      creationDate: new FormControl(null),

      lastUpdateUser: new FormControl(null),
      lastUpdateDate: new FormControl(null),

      validationDate: new FormControl(null),
      validationUser: new FormControl(null),

      status: new FormControl(EOfferStatus.DRAFT, { nonNullable: true, validators: [Validators.required] }),

      expiryDate: new FormControl(new Date(), { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      attributed: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),

      products: new FormArray<FormGroup<IProductForm>>([this.createProduct()]),

      itinerary: new FormGroup(<IItineraryForm>{
        depart: new FormControl(null, Validators.required),
        arrival: new FormControl(null, Validators.required),
      }),

      rotation: new FormGroup(<IRotationForm>{
        count: new FormControl(1, Validators.required),
        frequency: new FormControl(ERotationFrequency.WEEKLY, Validators.required),
      }),

      marketDuration: new FormGroup<IDurationForm>({
        length: new FormControl(0, { nonNullable: true, validators: Validators.required }),
        unit: new FormControl(EDurationUnit.MONTHS, { nonNullable: true, validators: Validators.required }),
      }),

      truckCategories: new FormArray<FormGroup<ITruckCategoryForm>>([this.createTruckCategory()]),

      fees: new FormArray<FormGroup<IFeeForm>>([EFeeType.FUEL, EFeeType.TRAVEL].map(this.createFee)),

      financialConfiguration: new FormGroup<IFinancialForm>({
        billingMethod: new FormControl('', { nonNullable: true, validators: Validators.required }),
        tonnagePrice: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
        paymentMethod: new FormControl(EPaymentMethod.CASH, { nonNullable: true, validators: Validators.required }),
        paymentFrequency: new FormControl(EPaymentFrequency.MONTHLY, { nonNullable: true, validators: Validators.required }),
      }),

      deadline: new FormControl(addDays(new Date(), 1), { nonNullable: true, validators: Validators.required }),
      requirements: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),

      selectionCriteria: new FormControl<string>(''),
      selectionProcess: new FormControl<string>(''),
    });
  }

  createProduct(): FormGroup<IProductForm> {
    return new FormGroup<IProductForm>({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      quantity: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      unit: new FormControl(EWeightUnit.TON, { nonNullable: true, validators: Validators.required }),
    });
  }

  createTruckCategory(): FormGroup<ITruckCategoryForm> {
    return new FormGroup<ITruckCategoryForm>({
      truckType: new FormControl(ETruckType.DUMP_TRUCK, { nonNullable: true, validators: Validators.required }),
      capacity: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      unit: new FormControl(EWeightUnit.TON, { nonNullable: true, validators: Validators.required }),
      count: new FormControl<number>(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      isGpsRequired: new FormControl<boolean>(false, { nonNullable: true, validators: Validators.required }),
    });
  }

  private createFee(feeType: EFeeType): FormGroup<IFeeForm> {
    return new FormGroup<IFeeForm>({
      label: new FormControl(feeType, { nonNullable: true, validators: Validators.required }),
      chargeHolder: new FormControl(EChargeHolder.CORPORATE, { nonNullable: true, validators: Validators.required }),
    });
  }
}

export interface IOfferForm {
  id: FormControl<string | null>;
  title: FormControl<string>;
  creationUser: FormControl<string | null>;
  creationDate: FormControl<Date | null>;
  lastUpdateUser: FormControl<string | null>;
  lastUpdateDate: FormControl<Date | null>;
  validationUser: FormControl<string | null>;
  validationDate: FormControl<Date | null>;

  status: FormControl<EOfferStatus>;
  expiryDate: FormControl<Date>;
  description: FormControl<string>;
  attributed: FormControl<boolean>;
  products: FormArray<FormGroup<IProductForm>>;
  itinerary: FormGroup<IItineraryForm>;
  rotation: FormGroup<IRotationForm>;
  fees: FormArray<FormGroup<IFeeForm>>;
  marketDuration: FormGroup<IDurationForm>;
  truckCategories: FormArray<FormGroup<ITruckCategoryForm>>;
  deadline: FormControl<Date>;
  financialConfiguration: FormGroup<IFinancialForm>;

  requirements: FormControl<string | null>;
  selectionCriteria: FormControl<string | null>;
  selectionProcess: FormControl<string | null>;
}

export interface IItineraryForm {
  depart: FormControl<Date | null>;
  arrival: FormControl<Date | null>;
}

export interface IRotationForm {
  count: FormControl<number>;
  frequency: FormControl<ERotationFrequency>;
}

export interface IDurationForm {
  length: FormControl<number>;
  unit: FormControl<EDurationUnit>;
}

export interface IFinancialForm {
  billingMethod: FormControl<string>;
  tonnagePrice: FormControl<number>;
  paymentMethod: FormControl<EPaymentMethod>;
  paymentFrequency: FormControl<EPaymentFrequency>;
}

export interface ITruckCategoryForm {
  truckType: FormControl<ETruckType>;
  capacity: FormControl<number>;
  unit: FormControl<EWeightUnit>;
  count: FormControl<number>;
  isGpsRequired: FormControl<boolean>;
}

export interface IProductForm {
  name: FormControl<string>;
  quantity: FormControl<number>;
  unit: FormControl<EWeightUnit>;
}

export interface IFeeForm {
  label: FormControl<EFeeType>;
  chargeHolder: FormControl<EChargeHolder>;
}
