import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private urlPublic = environment.apiPublic;
  private urlPrivate = environment.apiPrivate;

  constructor( private http: HttpClient, private _store: StoreService) {

  }
  
  load(id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.urlPrivate}/${this._store.leerSlugBase()}/colors/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);

  }

  save(data:[], id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.leerSlugBase()}/colors/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }

  getByIdWarehouse(product_id: number, warehouse_id: number, color_id: number){
    // const url = `${this.urlPrivate}/${this._store.leerSlugBase()}/colors/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    const url = `${this.urlPrivate}/${this._store.name()}/inventory/${product_id}/warehouse/${warehouse_id}/colors/${color_id}`
    return this.http.get(url);

  }

  getImagesByColorId(product_id: number, color_id: number){
    // const url = `${this.urlPrivate}/${this._store.leerSlugBase()}/colors/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    const url = `${this.urlPrivate}/${this._store.name()}/products/${product_id}/colors/${color_id}/images`
    return this.http.get(url);

  }

  deleteImage(product_id: number, color_id: number, image_id :number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/products/${product_id}/colors/${color_id}/images/${image_id}/destroy`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);
  
    return this.http.delete(url);;
  }

}
