import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StoreService } from '../store.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkuWarehouseService {

  //Servicios para la tabla sku_warehouse
  constructor( private http: HttpClient, private _store: StoreService) { }

  private url = environment.apiUrl;
  private urlPrivate = environment.apiPrivate;

  slugInventory(){
    return `${this.urlPrivate}/${this._store.leerSlugBase()}/inventory`
  }

  getBydId(sku_warehouse_id: number): Observable<any> {
    const url = `${this.slugInventory()}/sku-warehouse/${sku_warehouse_id}`;
    return this.http.get(url);
  }
}
