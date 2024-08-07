import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private store: string = "";

  setStore(store: string): void {
    this.store = store;
  }

  getStore(): string {
    return this.store;
  }

}
