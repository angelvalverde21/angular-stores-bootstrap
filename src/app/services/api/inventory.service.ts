import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StoreService } from '../store.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private url_base: string = "";
  private url_private: string = "";
  
  constructor(private http: HttpClient, private _store: StoreService) {
    this.url_base = environment.apiUrl + '/' + this._store.leerSlugBase() + '/inventory/warehouse';
    this.url_private = environment.apiPrivate + '/' + this._store.leerSlugBase() + '/inventory/warehouse';
  }




  /*** actualizaciones **/

  updateProduct(data:any, warehouse_id: number): Observable<any> {

    const url = `${this.url_private}/${warehouse_id}/product`;

    console.log(url);
    return this.http.post(url, data);
  }

  updateProductColor(data:any, warehouse_id: number): Observable<any> {
    const url = `${this.url_private}/${warehouse_id}/product/color`;
    console.log(url);
    return this.http.post(url, data);
  }

  updateProductSize(data:any, warehouse_id: number): Observable<any> {
    const url = `${this.url_private}/${warehouse_id}/product/size`;
    console.log(url);
    return this.http.post(url, data);
  }

  updateColorSize(data:any): Observable<any> {
    const url = `${this.url_private}/product/color-size`;
    console.log(url);
    return this.http.post(url, data);
  }

  updateWarehouseColorSize(data:any, warehouse_id: number): Observable<any> {
    const url = `${this.url_private}/${warehouse_id}/product/color-size`;
    console.log(url);
    return this.http.post(url, data);
  }
}
