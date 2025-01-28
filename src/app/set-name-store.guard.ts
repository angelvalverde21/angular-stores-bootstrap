import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanActivate } from '@angular/router';
import { StoreService } from './services/store.service';

@Injectable({
  providedIn: 'root',
})


export class setNameStoreGuard implements CanActivate, CanActivateChild {
  constructor(private _store: StoreService) {}

  canActivate(
    _route: ActivatedRouteSnapshot
  ): boolean {

    // Obtén el parámetro 'store' desde la ruta
    const name = _route.paramMap.get('store');
    console.log('valor inicial  xxxxx' + name);
    this._store.setName(name!);
    return true;
  }

  canActivateChild(): boolean {
    console.log('se paso por el canActivateChild oooooooo');

    return true;
  }
}