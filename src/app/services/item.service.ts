import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/orders`;
    console.log(this.url);
  
  }

  updateContent(data:any, order_id: number, item_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${order_id}/items/${item_id}/update-content`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }

  update(data:any, order_id: number, item_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${order_id}/items/${item_id}/update`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }


  
}
