import { AbstractControl, ValidationErrors } from '@angular/forms';

export function domainValidator(control: AbstractControl): ValidationErrors | null {
  const domainPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]+)*\/?$/;
  const isValid = domainPattern.test(control.value);

  return isValid ? null : { invalidDomain: true };
}