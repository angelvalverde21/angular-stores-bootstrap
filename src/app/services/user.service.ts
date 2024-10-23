import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private urlPrivate = environment.apiPrivate;

  constructor( private http: HttpClient, private _store: StoreService) {

  }
  
  getById(id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.urlPrivate}/${this._store.leerSlugBase()}/users/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);

  }

  info(){
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')!); //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

}
