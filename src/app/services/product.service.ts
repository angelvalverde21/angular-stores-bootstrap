import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor( private http: HttpClient) {

  }

  //private url = 'https://3b.pe/api/v1/ara/products';
  private url = environment.apiUrl + '/products';
  // private products : [] = [];

  /*********** CREANDO UN SERVICIO SUSCRIBIBLE PARA LOS PRODUCTOS ***********/

  private products: Subject<[]> = new Subject<[]>();

  /** CREANDO LOS SETTER Y GETTER */

  getProductsObservable() {
    return this.products.asObservable();
  }

  setProducts(value: []) {
    this.products.next(value);
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
