import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root', // Esto lo hace un servicio global
})

export class NameStoreResolver implements Resolve<any> {

  constructor(private _store: StoreService) {
    console.log("se ejecuto el resolver");
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const storeSlug = route.paramMap.get('store'); // Obtén el slug de la ruta

    if (storeSlug) {
      this._store.setName(storeSlug); // Establece el slug en el servicio
    }
  }

}
