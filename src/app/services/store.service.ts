import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //private url = 'https://3b.pe/api/v1/ara/products';
  private url_base = environment.apiUrl;
  private url = environment.apiUrl + '/products';

  //Ya no se necesita esto porque ahora hay un interceptor que hace este trabajo
  // private opciones = {
  //   headers: new HttpHeaders({
  //     "Content-Type":"application/json; charset=utf-8",
  //     "Accept": "application/json,text/*;q=0.99"
  //     //'Authorization': 'Bearer {token}'
  //   }),
  // };

  constructor( private http: HttpClient) {

  }

  getHome(store: string): Observable<any> {

    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_base}/${store}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log('ooooooooooooooooooooooo');
    
    return this.http.get(url);

  }

}