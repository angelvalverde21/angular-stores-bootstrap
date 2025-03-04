import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ShipmentService {
  name: string | null = null;
  url: string = '';
  urlPrivate: string = environment.apiPrivate;

  constructor(private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/shipments`;
    console.log(this.url);
  }

  index(): Observable<any> {
    const url = `${this.url}/index`;
    // console.log(url);
    return this.http.get(url);
  }

  //se usa save para la primara vez
  show(id: number | null): Observable<any> {
    const url = `${this.url}/${id}`;
    // console.log(url);
    return this.http.get(url);
  }

  //se usa save para la primara vez
  create(data: []): Observable<any> {
    const url = `${this.url}/create`;
    // console.log(url);
    return this.http.post(url, data);
  }

  //se usa update para las demas veces
  update(data: [], id: number | null): Observable<any> {
    const url = `${this.url}/${id}/update`;
    // console.log(url);
    return this.http.post(url, data);
  }

  
  //se usa update para las demas veces
  updateAddressId(data: [], id: number | null): Observable<any> {
    const url = `${this.url}/${id}/update/address`;
    // console.log(url);
    return this.http.post(url, data);
  }

}

//promp para chatgpt
//"Convierte un bloque de código en un array de strings, agregando \n solo al final de los párrafos y \t donde corresponda."




