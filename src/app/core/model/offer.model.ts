export interface IOfferModel {
  id?: string;

  creationUser?: string;
  creationDate?: Date;

  lastUpdateUser?: string;
  lastUpdateDate?: string;

  validationUser?: string;
  validationDate?: Date;

  status: EOfferStatus;

  expiryDate: Date;

  extensionDate?: Date;

  description: string;

  products: IProduct[];

  itinerary: IItinerary;

  rotation?: IRotation;

  fees?: IOfferFees[];

  marketDuration?: IDuration;

  truckCategories: ITruckCategory[];

  financialConfiguration: IFinancialConfiguration;

  submission: ISubmissionCriteria;

  attributed: boolean;

  requirements?: Record<string, string>;

  selectionProcess?: string;

  notationCriteria?: string;
}

export interface IProduct {
  name: string;
  quantity: number;
  unit: EWeightUnit;
}

export interface IItinerary {
  depart: string;
  arrival: string;
}

export interface IRotation {
  count: number;
  frequency: ERotationFrequency;
}

export interface IOfferFees {
  label: EFeeType;
  chargeHolder: EChargeHolder;
}

export interface IDuration {
  length: number;
  unit: EDurationUnit;
}

export interface ITruckCategory {
  truckType: ETruckType;
  capacity?: number;
  unit?: EWeightUnit;
  count: number;
  isGpsRequired: boolean;
}

export interface IFinancialConfiguration {
  billingMethod: string;
  tonnagePrice: number;
  paymentMethod: EPaymentMethod;
  paymentFrequency: EPaymentFrequency;
}

export interface ISubmissionCriteria {
  format: ESubmissionFormat;
  limitDate: Date;
}

export enum ESubmissionFormat {
  PLATFORM = 'PLATFORM',
  MAIL = 'MAIL',
}

// noinspection JSUnusedGlobalSymbols
export enum EWeightUnit {
  TON = 'TON',
  L = 'L',
}

// noinspection JSUnusedGlobalSymbols
export enum EDurationUnit {
  HOURS = 'HOURS',
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS',
  ANNUALS = 'ANNUALS',
  INDEFINITE = 'INDEFINITE'
}

// noinspection JSUnusedGlobalSymbols
export enum ERotationFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY'
}

// noinspection JSUnusedGlobalSymbols
export enum EFeeType {
  FUEL = 'FUEL',
  TRAVEL = 'TRAVEL'
}

export enum EChargeHolder {
  CORPORATE = 'CORPORATE',
  CUSTOMER = 'CUSTOMER'
}

// noinspection JSUnusedGlobalSymbols
export enum EPaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  WAVE = 'WAVE',
  OM = 'OM'
}

// noinspection JSUnusedGlobalSymbols
export enum EPaymentFrequency {
  UNLOAD = 'UNLOAD',
  COMPLETION = 'COMPLETION',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUALLY = 'ANNUALLY'
}

// noinspection JSUnusedGlobalSymbols
export enum ETruckType {
  CURTAINSIDE_TRUCK = 'CURTAINSIDE_TRUCK', //camion tautliner
  DUMP_TRUCK = 'DUMP_TRUCK', // camion-benne
  TANK_TRUCK = 'TANK_TRUCK', // camion-citerne
  SEMI_TRAILER_TRUCK = 'SEMI_TRAILER_TRUCK', // camion semi-remorque
  REFRIGERATED_TRUCK = 'REFRIGERATED_TRUCK', // camion frigorifique
  FLATBED_TRUCK = 'FLATBED_TRUCK', // camion plateau
  BOX_TRUCK = 'BOX_TRUCK', // camion fourgon
  EQUIPMENT_CARRIER = 'EQUIPMENT_CARRIER' // camion porte-char
}

// noinspection JSUnusedGlobalSymbols
export enum EOfferStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}
