import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = environment.apiUrl;
  private cartItemsSubject: BehaviorSubject<any[]>;

  constructor(private http: HttpClient, private _store: StoreService) {

    const storedItems = localStorage.getItem('cartItems');

    this.cartItemsSubject = new BehaviorSubject<any[]>(storedItems ? JSON.parse(storedItems) : [])
    
  }

  items: any[] = [];

  addItem(item: any) {
    // Verifica si ya hay elementos en 'cartItems'
    const cartItemsString = localStorage.getItem('cartItems');

    let items;

    if (cartItemsString != null) {
      // Convierte la cadena a un array de objetos JSON
      items = JSON.parse(cartItemsString);
    } else {
      // Inicializa 'this.items' como un array vacío si no hay datos
      items = [];
    }

    // Agrega el nuevo item
    items.unshift(item);

    // Vuelve a setear los elementos del carrito en localStorage
    this.setItems(items);
    // localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getItems() {
    if (localStorage.getItem('cartItems') != null) {
      return JSON.parse(localStorage.getItem('cartItems')!);
    } else {
      return [];
    }
  }

  setItems(items: any) {
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  /***************** observables ******************/

  getItemsObservable(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  /***************** fin de observables ******************/

  // private cartVisibility = new Subject<boolean>();
  // cartVisibility$ = this.cartVisibility.asObservable();

  // openCart() {
  //   this.cartVisibility.next(true);
  // }

  // closeCart() {
  //   this.cartVisibility.next(false);
  // }

  private cartVisibility: Subject<boolean> = new Subject<boolean>();

  /** CREANDO LOS SETTER Y GETTER */

  setOpenCart(value: boolean) {
    this.cartVisibility.next(value);
    // this.cartVisibility.complete(); //termina la suscripcion, util cuando solo se requiere usar una sola vez
  }

  getOpenCartObservable() {
    return this.cartVisibility.asObservable();
  }

  numeroCifras: number = 0;

  verifyPhone = (control: FormControl) => {
    //contamos el numero de digitos, para ello convertimos la cifra a cadenas con toString()

    this.numeroCifras = control.value.toString().length;

    /* COMO EL VALIDADOR ASINCRONO SOLO RECIBE PROMERSAS, TENEMOS QUE CREAR UNA *******/
    /* NO PODEMOS SIMPLEMENTE HACER UN RETURN FALSE, PORQUE EL VALIDADOR NO LO ACEPTA */
    /* POR ELLO TENEMOS QUE HACER UN return new Promise... etc ************************/
    /******************** DEVOLVEMOS UNA PROMESA CON VALOR FALSE  *********************/

    if (!(this.numeroCifras == 9)) {
      return new Promise(function (resolve, reject) {
        (resolve: boolean) => {
          return false;
        };
      });
    }

    /******************** FIN DE DEVOLVEMOS UNA PROMESA CON VALOR FALSE  ********************/

    /******************** SI INCUMPLE LO ANTERIOR RECIEN ENVIAMOS UN POST PARA REVISAR EN LA BASE DE DATOS  ********************/
    console.log(this.url + '/' + this._store.name() + '/register/verify-phone');

    return this.http
      .post(this.url + '/' + this._store.name() + '/register/verify-phone', {
        phone: control.value,
      })
      .pipe(
        map((data: any) => {
          console.log(data);
          if (data.isValid) {
            return null; //si la validacion es correcta se debe devolver un null
          }else{
            return { existe: true }; //se devuevle un objeto siempre y cuando la validacion no sea correcta
          }
        }),
      );
  };

  verifyDni = (control: FormControl) => {

    this.numeroCifras = control.value.toString().length;

    /* COMO EL VALIDADOR ASINCRONO SOLO RECIBE PROMERSAS, TENEMOS QUE CREAR UNA *******/
    /* NO PODEMOS SIMPLEMENTE HACER UN RETURN FALSE, PORQUE EL VALIDADOR NO LO ACEPTA */
    /* POR ELLO TENEMOS QUE HACER UN return new Promise... etc ************************/
    /******************** DEVOLVEMOS UNA PROMESA CON VALOR FALSE  *********************/

    if (!(this.numeroCifras == 8)) {
      return new Promise(function (resolve, reject) {
        (resolve: boolean) => {
          return false;
        };
      });
    }
    /******************** FIN DE DEVOLVEMOS UNA PROMESA CON VALOR FALSE  ********************/

    return this.http
      .post(this.url + '/' + this._store.name() + '/register/verify-dni', { dni: control.value })
      .pipe(
        map((data: any) => {
          console.log(data);
          if (data.isValid) {
            return null; //si la validacion es correcta se debe devolver un null
          }else{
            return { existe: true }; //se devuevle un objeto siempre y cuando la validacion no sea correcta
          }
        }),
      );

  };
}
