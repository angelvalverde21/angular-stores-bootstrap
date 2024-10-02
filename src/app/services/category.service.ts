import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient, private _store: StoreService) {

  }

  //private url = 'https://3b.pe/api/v1/ara/products';
  private url = environment.apiUrl;
  private urlPrivate = environment.apiPrivate;

  private notifyCategoryCreate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //aqui el BehaviorSubject necesita un valor inicial en el argumento y le estamos pasando []

  //Envia el valor de la propieadad a los componentes
  getNotifyCategoryCreate() {
    return this.notifyCategoryCreate.asObservable();
  }

  //Establece el valor de la propiedad 
  setNotifyCategoryCreate(value: boolean) {
    // console.log();
    this.notifyCategoryCreate.next(value)
  }


  create(data:[]): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this._store.name()}/categories/create`;
    console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }

}
