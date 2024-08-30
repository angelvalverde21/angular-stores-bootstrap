import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dniValidator(control: AbstractControl): ValidationErrors | null {
  const dniPattern = /^[0-8]\d{7}$/; // Expresión regular para validar DNI sin que comience con 9
  const isValid = dniPattern.test(control.value);

  return isValid ? null : { invalidDni: true };
}