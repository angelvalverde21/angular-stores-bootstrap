import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class verifyStoreResolver implements Resolve<any> {

  constructor(private _store: StoreService) {}

  resolve(_route: ActivatedRouteSnapshot): Observable<any> {

    const slugBase = _route.paramMap.get(environment.parametroBase);

    if (!slugBase) {
      // Redirige si no hay slugBase en la URL
      return of(null);
    }

    return this._store.isValid(slugBase).pipe(
      switchMap((isValid:boolean) => {
        if (isValid) {
          console.log('resolver valido');
          
          // Redirige a error-404 si el slug no es válido
          return of({ slugBase });
        }else{
          console.log('resolver invalido');
          return of(null);
        }
        
        // Si el slug es válido, verifica si el usuario está autenticado
      }),
      catchError(err => {
        return of(null); // Devuelve `false` en caso de error
      })
    );

  }
}