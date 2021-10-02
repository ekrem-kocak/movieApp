import { AbstractControl } from '@angular/forms';

export function StudentEmailValidator(control: AbstractControl) {
  const v = control.value as string;

  if (v.includes('@ogr') && v.endsWith('.edu.tr')){
    return null
  }
  return {
    wrongExtension : true,
  };
}
