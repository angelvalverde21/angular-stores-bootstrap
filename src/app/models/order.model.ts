import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';
import { inject } from '@angular/core';

export class Order {
  url: string = '';
  name: string | null = null;
  urlPrivate: string = environment.apiPrivate;

  private _store = inject(StoreService);

  constructor(
    private warehouse_id: number,
    private http: HttpClient,
  ) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/warehouses/`;
  }

  // Método para obtener todas las órdenes del warehouse
  getAll(): Observable<any> {
    return this.http.get(`${this.url}/${this.warehouse_id}/orders`);
  }


}
