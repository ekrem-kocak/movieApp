import { AbstractControl } from '@angular/forms';

export function ImageUrlValidators(control: AbstractControl) {
  const v = control.value as string;

  if (v!= null && v.endsWith('.jpg')) {
    return null
  }
  return {
    wrongExtension: true
  }
}
