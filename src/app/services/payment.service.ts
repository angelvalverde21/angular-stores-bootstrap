import { Injectable } from '@angular/core';
  //Esto va en los imports arriba
  import { environment } from '../../environments/environment';
  import { HttpClient } from '@angular/common/http';
  import { StoreService } from './store.service';
  import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {



  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;

  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}`;
    console.log(this.url);

  }

  index(order_id: number, type: number | null = null): Observable<any> {

    const url = `${this.url}/orders/${order_id}/payments/type/${type}`;
    console.log(url);
    return this.http.get(url);
  }

  //se usa save para la primara vez
  save(data:[], payment_id: number | null): Observable<any> {

    const url = `${this.url}/products/id`;
    // console.log(url);
    return this.http.post(url, data);

  }

  //se usa update para las demas veces
  update(data:[], id: number | null): Observable<any> {

    const url = `${this.url}/products/id`;
    // console.log(url);
    return this.http.post(url, data);

  }

  //se usa save para la primara vez
  destroy(payment_id: number | null, order_id: number | null = null): Observable<any> {

    const url = `${this.url}/orders/${order_id}/payments/${payment_id}/destroy`;
    // console.log(url);
    return this.http.get(url);

  } 

}
