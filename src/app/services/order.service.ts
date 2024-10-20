import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/manage/orders`;
    console.log(this.url);
  
  }
  
  getAll(): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = this.url;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
    
  }

  
  getById(order_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${order_id}`;
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


}
