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

}
