import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';
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
    const store = JSON.parse(localStorage.getItem('store')!);

    const orders = store.orders;
    
    
    console.log(orders);
    
    const order = orders.find((order: any) => order?.id == order_id);
  
    if (order != null) {
      // Retorna un observable con el pedido encontrado
      let resp : any[any] = [];
      resp['data'] = order;
      return of(resp);

    } else {
      // Si no está en localStorage, hace la solicitud HTTP
      const url = `${this.url}/${warehouse_id}/orders/${order_id}`;
      // const url = `${this.url_base}?store=${store}`;
      // console.log(url);
  
      return this.http.get(url).pipe(
        tap((resp:any) => {
          console.log("warehouse order service");
          console.log(resp.data);
          store.orders.push(resp.data);
          localStorage.setItem('store', JSON.stringify(store)); 
        })
      );

    }
    
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
