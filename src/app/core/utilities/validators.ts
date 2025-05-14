import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { isDevMode } from '@angular/core';

const majorProviders = /^(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|live\.com|msn\.com|icloud\.com|me\.com|protonmail\.com|orange\.fr|sfr\.fr|laposte\.fr|bbox\.fr|numericable\.fr|free\.fr|wanadoo\.fr|netcourrier\.com|voila\.fr|ymail\.com|rocketmail\.com|hotmail\.fr|outlook\.fr|live\.fr|free\.net)$/;
const eduAndGovDomains = /^(.*\.edu$|.*\.gov\..*|.*\.edu\..*|.*\.net$|.*\.fr$)$/;

export const isPhoneNumberValid = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    return value.length === 0 || isValidPhoneNumber(value, 'SN') ? null : { invalidPhoneNumber: true };
  };
};

export const mustMatch = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (controls: AbstractControl): ValidationErrors | null => {
    const control = controls.get(controlName);
    const matchingControl = controls.get(matchingControlName);

    if (matchingControl?.hasError('required')) {
      return null;
    }

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  };
};

export const isEmailDomainValid = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isDevMode() || control.hasError('required') || control.hasError('email'))
      return null;
    const domain = (control.value ?? '').split('@')[1];
    return majorProviders.test(domain) || eduAndGovDomains.test(domain) ? null : { badEmailDomain: true };
  };
};
