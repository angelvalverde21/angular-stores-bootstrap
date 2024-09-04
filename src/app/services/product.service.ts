import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor( private http: HttpClient, private _store: StoreService) {

  }

  //private url = 'https://3b.pe/api/v1/ara/products';
  private url = environment.apiUrl;
  private urlPrivate = environment.apiPrivate;
  // private products : [] = [];

  /*********** CREANDO UN SERVICIO SUSCRIBIBLE PARA LOS PRODUCTOS ***********/

  private products: Subject<[]> = new Subject<[]>();

  /** CREANDO LOS SETTER Y GETTER */

  setProducts(value: []) {
    this.products.next(value);
    // this.products.complete(); //termina la suscripcion, util cuando solo se requiere usar una sola vez
  }

  getProductsObservable() {
    return this.products.asObservable();
  }


  load(id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.urlPrivate}/${this._store.leerSlugBase()}/products/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  
  save(data:[], id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.leerSlugBase()}/products/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }
  // setProducts(products: any[]): void {
  //   this.productsSubject.next(products);
  // }


  // setProducts(products: []): void {
  //   this.products = products;
  // }

  
  // getAll(){
  //   return this.http.get(this.url);
  // }

  // getItem(id: any ){
  //   return this.http.get(this.url + '/' + id);
    
  // }

  // getStockColorsize(id:number){
  //   return this.http.get(this.url + '/color/size/stock/' + id); 
  // }

  // getStock(id: number ){
  //   return this.http.get(this.url + id);
    
  // }

  // getFotos(id: number ){
  //   return this.http.get(this.url + id);
  // }

  // getColor(id: number){
  //   return this.http.get(this.url + '/color/' + id);  
  // }
  
}
