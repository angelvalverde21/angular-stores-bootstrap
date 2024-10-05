import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPublicService {

  private urlPublic = environment.apiPublic;

  constructor( private http: HttpClient, private _store: StoreService) {

  }

  
  getById(id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.urlPublic}/${this._store.name()}/products/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.get(url);
  }
}
