import { PrimeNgFrTranslation } from './locale.fr';
import { PrimeNGCustomPreset } from './preset';
import { PrimeNGConfigType } from 'primeng/config';

const primeNGConfiguration: PrimeNGConfigType = {
  inputStyle: 'filled',
  inputVariant: 'filled',
  ripple: true,
  translation: PrimeNgFrTranslation,
  theme: {
    preset: PrimeNGCustomPreset,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primeng',
        order: 'base, theme, primeng, utilities'
      }
    }

  }
};

export default primeNGConfiguration;
