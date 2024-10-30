import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseOrderService {

  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {

    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/warehouses`;
    console.log(this.url);
  
  }
  
  getAll(warehouse_id:any): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${warehouse_id}/orders`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
    
  }

  getById(warehouse_id:number, order_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${warehouse_id}/orders/${order_id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
    
  }

  generateOrder(data:[]): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/create-with-login`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }

  
  createOrderDelivery(data:[], warehouse_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${warehouse_id}/orders/create/delivery`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }


  createOrderTienda(data:[], warehouse_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${warehouse_id}/orders/create/tienda`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }
}
