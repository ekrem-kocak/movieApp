import { AbstractControl } from '@angular/forms';

export function ImageUrlValidators(control: AbstractControl) {
  const v = control.value as string;

  if (v.endsWith('.jpg')) {
    return null
  }
  return {
    wrongExtension: true
  }
}
