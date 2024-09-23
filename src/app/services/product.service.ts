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
    
    const url = `${this.urlPrivate}/${this._store.name()}/products/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  all(): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    
    const url = `${this.urlPrivate}/${this._store.name()}/products/warehouses/2`;

    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  
  save(data:[], id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/products/${id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }

  create(data:[]): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/products/create`;
    console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }

  /* Analogos en laravel

    getProducts (Angular: getAll)
    {store}/products

    getProduct (Angular: getBydId)
    {store}/products/{product_id}

    getProductsWarehouse (Angular: getAllWarehouse)
    {store}/products/warehouse/{warehouse_id}

    getProductWarehouse (Angular: getByIdWarehouse)
    {store}/products/{product_id}/warehouse/{warehouse_id}

    getProductsWarehouseSearch (Angular: getAllWarehouseSearch)
    {store}/products/warehouse/{warehouse_id}/search/{search}

  */

  slugProducts(){
    return `${this.urlPrivate}/${this._store.name()}/products`
  }

  slugInventory(){
    return `${this.urlPrivate}/${this._store.name()}/inventory`
  }

  /***** peticiones GET */

  getAll(): Observable<any> {
    const url = this.slugProducts();
    return this.http.get(url);
  }

  getColorsActive(product_id: number): Observable<any> {
    const url = `${this.slugProducts()}/${product_id}/colors`;
    return this.http.get(url);
  }

  getColorsInactive(product_id: number): Observable<any> {
    const url = `${this.slugProducts()}/${product_id}/colors/inactive`;
    return this.http.get(url);
  }

  getAllSearch(search:string): Observable<any> {
    const url = `${this.slugProducts()}/search/${search}`;
    return this.http.get(url);
  }
  getBydId(product_id: number): Observable<any> {
    const url = `${this.slugProducts()}/${product_id}`;
    return this.http.get(url);
  }
  getAllWarehouse(warehouse_id: number): Observable<any> {
    const url = `${this.slugInventory()}/warehouse/${warehouse_id}`;
    return this.http.get(url);
  }
  
  getByIdWarehouse(product_id: number, warehouse_id: number): Observable<any> {
    const url = `${this.slugInventory()}/${product_id}/warehouse/${warehouse_id}`;
    return this.http.get(url);
  }

  
  getAllWarehouseSearch(search: string, warehouse_id: number): Observable<any> {
    const url = `${this.slugInventory()}/warehouse/${warehouse_id}/search/${search}`;
    return this.http.get(url);
  }

  getByIdSkuWarehouse(sku_warehouse_id: number){
    const url = `${this.slugInventory()}/sku-warehouse/${sku_warehouse_id}`;
    return this.http.get(url);
  }
}
