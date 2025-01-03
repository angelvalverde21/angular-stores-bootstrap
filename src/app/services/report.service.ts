import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {

    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/products`;
    console.log(this.url);
  
  }

  product(product_id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.url}/${product_id}/report`;

    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.get(url);
  }

}
