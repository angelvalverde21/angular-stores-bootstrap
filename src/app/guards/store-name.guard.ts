import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// import { log } from 'console';

export const storeNameGuard: CanActivateFn = (route, state) => {
  const _storeService = inject(StoreService);

  const storeName = route.paramMap.get(environment.parametroBase) || '';

  const router = inject(Router);
  // console.log(state);

  if (storeName == 'error-404') {
    console.log('parado para evtar un bucle');
    return false;
  } else {
    return _storeService.getHome(storeName).pipe(
      map((response) => {
        if (response.success) {
          console.log('navegacion correcta');
          return true;
        } else {
          console.log('navegacion erronea');
          router.navigate(['/error-404']);
          return false;
        }
      }),
      catchError(() => {
        console.log('navegacion errone catch');
        router.navigate(['/error-404']);
        return of(false);
      })
    );
  }
};

// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { StoreService } from '../services/store.service';
// import { environment } from '../../environments/environment';

// export class StoreNameGuard implements CanActivate {

//   constructor(private _storeService: StoreService, private router: Router, private route: ActivatedRoute, ) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {

//     this.route.params.subscribe((params) => {
//       const store = params[environment.parametroBase]; //el parametro base es store

//       if (this._storeService.verifyStore(environment.parametroBase)) {
//         this._storeService.setSlug(store);
//         return true;
//       } else {
//         return false;
//       }
//     });

//   }

// }
