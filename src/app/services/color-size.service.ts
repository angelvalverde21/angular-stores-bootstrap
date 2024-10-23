import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ColorSizeService {

  name: string | null = null;
  url: string = "";

  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/warehouses`;
  }

  getAll(warehouse_id: number, product_id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.url}/${warehouse_id}/products/${product_id}/color-size`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);

  }
  
}
