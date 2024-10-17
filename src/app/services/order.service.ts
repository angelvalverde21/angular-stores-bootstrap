import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urlPrivate = environment.apiPrivate;

  constructor( private http: HttpClient, private _store: StoreService) {

  }

  all(): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/orders`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
    
  }

  
  getById(order_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/orders/${order_id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
    
  }

  generateOrder(data:[]): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/orders/create-with-login`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }


}
