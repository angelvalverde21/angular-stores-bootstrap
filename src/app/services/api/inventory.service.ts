import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StoreService } from '../store.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private url_base: string = "";
  private url_private: string = "";
  
  constructor(private http: HttpClient, private _store: StoreService) {
    this.url_base = environment.apiUrl + '/' + this._store.leerSlugBase() + '/inventory';
    this.url_private = environment.apiPrivate + '/' + this._store.leerSlugBase() + '/inventory';
  }

  updateColorSize(data:any, warehouse_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_private}/warehouse/${warehouse_id}/color-size`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);
    return this.http.post(url, data);
  }
}
