import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StoreService } from '../store.service';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OptionService {

  url = environment.apiUrl;
  private opciones = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json,text/*;q=0.99',
    }),
  }

  constructor(    
    private _http: HttpClient,
    private _store: StoreService
  ) {}

  save(option: any) {
    
    return this._http.post(this.url + '/procesos/options/' + this._store.leerSlugBase(), option, this.opciones).pipe(
      map((resp: any) => {
        // this._console.log('entro al RXJS');

        console.log(resp);
        return resp;
      })
    );
  }

  all(): Observable<any> {

    // Construye la URL con el parámetro 'nombre'
    const url = this.url + '/procesos/options/' + this._store.leerSlugBase();

    console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this._http.get(url);
  }

}
