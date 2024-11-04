import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StoreService } from './store.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  constructor( private http: HttpClient, private _store: StoreService, private _auth: AuthService) {

  }

  private url = environment.apiPrivate;

  create(data:[], user_id: number | null = null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${this._store.name()}/user/${user_id}/address/create`;
    // console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }

  
  getAll(user_id: number | null = null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.url}/${this._store.name()}/user/${user_id}/address/index`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.get(url);
  }

  //Es mejor usar update porque save se confunde con crear que tambien seria guardar registro, es mas explicito usar update
  update(data:[], address_id: number | null, user_id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${this._store.name()}/user/${user_id}/address/${address_id}/update`;
    // console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }
}
