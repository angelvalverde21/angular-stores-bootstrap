import { CanActivateFn } from '@angular/router';

export const storeGuard: CanActivateFn = (route, state) => {
  return true;
};
