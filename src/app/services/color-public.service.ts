import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class ColorPublicService {

  private urlPublic = environment.apiPublic;

  constructor( private http: HttpClient, private _store: StoreService) {

  }

  getById(product_id: number | null, color_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.urlPublic}/${this._store.name()}/products/${product_id}/colors/${color_id}`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.get(url);

  }

}
