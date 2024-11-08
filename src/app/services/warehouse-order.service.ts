import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseOrderService {

  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {

    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/warehouses`;
    console.log(this.url);
  
  }
  
  getAll(warehouse_id:any): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url}/${warehouse_id}/orders`;
    console.log("hola");
    
    return this.http.get(url);

    const store = JSON.parse(localStorage.getItem('store')!);
    // const warehouse = store.warehouses.find((warehouse:any) => warehouse.id == warehouse_id);
    // warehouse['orders'] = data;

    const warehouseIndex = store.warehouses.findIndex((warehouse: any) => warehouse.id == warehouse_id);

    const orders = store.warehouses[warehouseIndex].orders;

    if (warehouseIndex !== -1) {
      
      // console.log("x");
      

      if(orders != null){
        return of({"data": orders});
      }else{

        // console.log("z");
        
        // const url = `${this.url_base}?store=${store}`;
        // console.log(url);
      
        return this.http.get(url).pipe(
          tap((resp:any) => {
            store.warehouses[warehouseIndex]['orders'] = resp.data;
            localStorage.setItem('store', JSON.stringify(store)); 
          })
        );

      }

    }else{
      // console.log("w");
      return of(null);
    }
    
  }

  getById(warehouse_id:number, order_id: number): Observable<any> {

    const url = `${this.url}/${warehouse_id}/orders/${order_id}`;
    return this.http.get(url);

    const store = JSON.parse(localStorage.getItem('store')!);

    const orders = store.orders; //recibe los valores de orders que estan en el localStorage
    
    console.log(orders);
    
    const order = orders.find((order: any) => order?.id == order_id);
  
    if (order != null) {
      // Retorna un observable con el pedido encontrado
      let resp : any[any] = [];
      resp['data'] = order;
      return of(resp);

    } else {
      // Si no está en localStorage, hace la solicitud HTTP
      
      // const url = `${this.url_base}?store=${store}`;
      // console.log(url);
  
      return this.http.get(url).pipe(
        tap((resp:any) => {
          console.log("warehouse order service");
          console.log(resp.data);
          store.orders.push(resp.data);
          localStorage.setItem('store', JSON.stringify(store)); 
        })
      );

    }
    
  }

  generateOrder(data:[]): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/create-with-login`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }

  
  createOrderDelivery(data:[], warehouse_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${warehouse_id}/orders/create/delivery`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }


  createOrderTienda(data:[], warehouse_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${warehouse_id}/orders/create/tienda`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }

  update(data:any, order_id: number | null): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/orders/${order_id}/update`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
  }

  private item: BehaviorSubject<{}> = new BehaviorSubject<{}>({}); //aqui el BehaviorSubject necesita un valor inicial en el argumento y le estamos pasando []

  //Envia el valor de la propieadad a los componentes
  getAddItemObservable() {
    return this.item.asObservable();
  }

  //Establece el valor de la propiedad 
  setAddItem(value: {}) {
    console.log();
    this.item.next(value)
  }
}
