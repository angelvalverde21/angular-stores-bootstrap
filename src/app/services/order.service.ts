import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  name: string | null = null;
  url: string = "";
  urlOrders: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/manage/orders`;
    this.urlOrders = `${this.urlPrivate}/${this.name}/orders`;
    console.log(this.url);
  
  }
  
  getAll(): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = this.url;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
    
  }

  
  getById(order_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/${order_id}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
    
  }

  generateOrder(data:[]): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.url}/create-with-login`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.post(url, data);
    
  }


  orderStatus: any;
  
  status(order: any){

    if (order.is_delivery) {

      this.orderStatus =  {
        "message":"Entregado",
        "icon":"bs-stepper-circle",
        "case":"is_delivery",
        "color":"is_delivery",
      }

    } else {

      if (order.is_shipment) {

        this.orderStatus =  {
          "message":"Enviado",
          "icon":"fas fa-shipping-fast",
          "case":"is_shipment"
        }

        
      } else {

        if (order.is_package) {

          this.orderStatus =  {
            "message":"Listo para Envio",
            "icon":"fas fa-box-open",
            "case":"is_package"
          }

        } else {

          if (order.is_pay) {

            this.orderStatus =  {
              "message":"Preparar Envio",
              "icon":"fas fa-dollar-sign",
              "case":"is_pay"
            }

          } else {

            this.orderStatus =  {
              "message":"Solicitado",
              "icon":"",
              "case":""
            }

          }
        }
      }
    }

    return this.orderStatus;
  }


  photoPackageIndex(order_id: number): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlOrders}/${order_id}/package/photos`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.get(url);
    
  }

  destroy(photo_id:number, order_id: number){
    const url = `${this.urlOrders}/${order_id}/package/photos`;
    // const url = `${this.url_base}?store=${store}`;
    console.log(url);

    return this.http.get(url);
  }

}
