import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PdfService {

  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {
    this.name = this._store.name();
    this.url = `${this.urlPrivate}/${this.name}/orders`;
    console.log(this.url);
  
  }

  download(url: string, token: string) {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`, // O puedes enviar otro tipo de credenciales
    //   'Content-Type': 'application/json',
    // });

    return this.http.get(url, {
      responseType: 'blob', // Importante para descargar el archivo como blob
    });
  }

  downloadPdf(order_id: number, tipo: string = "packing"){

    const url = `${this.url}/${order_id}/pdf/${tipo}`;
    // console.log(url);

    return this.http.get(url, {
      responseType: 'blob', // Importante para descargar el archivo como blob
    });
  }

  
  downloadStockBarCode(sku_id: number, quantity: number){

    const url = `${this.urlPrivate}/${this.name}/inventory/pdf/sku/${sku_id}/quantity/${quantity}`;
    // console.log(url);

    return this.http.get(url, {
      responseType: 'blob', // Importante para descargar el archivo como blob
    });
  }


  // downloadVoucher(order_id: number){

  //   const url = `${this.url}/orders/${order_id}/pdf/voucher`;
  //   // console.log(url);

  //   return this.http.get(url, {
  //     responseType: 'blob', // Importante para descargar el archivo como blob
  //   });
  // }



}
