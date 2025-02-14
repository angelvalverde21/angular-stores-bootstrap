//Esto va en los imports arriba
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ImageService {


  name: string | null = null;
  url: string = "";
  urlPrivate: string = environment.apiPrivate;
  
  constructor( private http: HttpClient, private _store: StoreService) {

  }

  index(path: string): Observable<any> {
  
    const url = `${this.urlPrivate}/${this._store.name()}/${path}/index`;
    // console.log(url);
    return this.http.get(url);
  }
  
  //se usa update para las demas veces
  destroy(path: string): Observable<any> {
  
    const url = `${this.urlPrivate}/${this._store.name()}/${path}/destroy`;
    // console.log(url);
    return this.http.delete(url);
  
  }
  

  
}


