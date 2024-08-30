import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const phonePattern = /^9\d{8}$/; // Expresión regular para validar teléfono
  const isValid = phonePattern.test(control.value);

  return isValid ? null : { invalidPhone: true };
}