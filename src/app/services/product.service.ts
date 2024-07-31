import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  //private url = 'https://3b.pe/api/v1/ara/products';
  private url = environment.apiUrl + '/products';

  private opciones = {
    headers: new HttpHeaders({
      "Content-Type":"application/json; charset=utf-8",
      "Accept": "application/json,text/*;q=0.99"
      //'Authorization': 'Bearer {token}'
    }),
  };

  constructor( private http: HttpClient) {

  }

  
  getAll(){
    return this.http.get(this.url, this.opciones);
  }

  getItem(id: any ){
    return this.http.get(this.url + '/' + id, this.opciones);
    
  }

  getStockColorsize(id:number){
    return this.http.get(this.url + '/color/size/stock/' + id, this.opciones); 
  }

  getStock(id: number ){
    return this.http.get(this.url + id, this.opciones);
    
  }

  getFotos(id: number ){
    return this.http.get(this.url + id, this.opciones);
  }

  getColor(id: number){
    return this.http.get(this.url + '/color/' + id, this.opciones);  
  }
  
}
