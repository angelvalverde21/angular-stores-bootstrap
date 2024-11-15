import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/couriers`;
    console.log(this.url);
  
  }

  createAddress(data:[], courier_id: number | null = null): Observable<any> {
      // Construye la URL con el parámetro 'nombre'
  
      const url = `${this.url}/${this._store.name()}/couriers/${courier_id}/address/create`;
      // console.log(url);
      
      // const url = `${this.url_base}?store=${store}`;
      // console.log(url);
  
      return this.http.post(url, data);
    }

  updateAddress(data:[], address_id: number | null, courier_id: number | null): Observable<any> {

    const url = `${this.url}/${courier_id}/address/update`;
    // console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);

  }


  getAllAddress(courier_id: number | null = null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.url}/${courier_id}/address/index`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.get(url);
  }

}
