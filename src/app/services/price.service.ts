import { Injectable } from '@angular/core';

  //Esto va en los imports arriba
  import { environment } from '../../environments/environment';
  import { HttpClient } from '@angular/common/http';
  import { StoreService } from './store.service';
  import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  
  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/products`;
    console.log(this.url);
  
  }
  index(): Observable<any> {
  
    const url = `${this.urlPrivate}/${this._store.name()}/products/warehouses/2`;
    // console.log(url);
    return this.http.get(url);
  }
  
  //se usa save para la primara vez
  save(product_id: number, price:number, quantity: number): Observable<any> {
  
    let data = {
      "price" : price,
      "quantity" : quantity,
    }

    const url = `${this.url}/${product_id}/prices/create`;
    console.log(url);
    return this.http.post(url, data);
  
  }
  //se usa update para las demas veces
  update(data:[], id: number | null): Observable<any> {
  
    const url = `${this.urlPrivate}/${this._store.name()}/products/id`;
    // console.log(url);
    return this.http.post(url, data);
  
  }

}
