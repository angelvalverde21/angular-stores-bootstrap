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

    this.cartItemsSubject = new BehaviorSubject<any[]>(
      storedItems ? JSON.parse(storedItems) : []
    );
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
          } else {
            return { existe: true }; //se devuevle un objeto siempre y cuando la validacion no sea correcta
          }
        })
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
      .post(this.url + '/' + this._store.name() + '/register/verify-dni', {
        dni: control.value,
      })
      .pipe(
        map((data: any) => {
          console.log(data);
          if (data.isValid) {
            return null; //si la validacion es correcta se debe devolver un null
          } else {
            return { existe: true }; //se devuevle un objeto siempre y cuando la validacion no sea correcta
          }
        })
      );
  };

  private summarySubject: Subject<void> = new Subject<void>();

  /** CREANDO LOS SETTER Y GETTER */

  setSummary() {
    this.summarySubject.next();
    // this.cartVisibility.complete(); //termina la suscripcion, util cuando solo se requiere usar una sola vez
  }

  getSummaryObservable() {
    return this.summarySubject.asObservable();
  }

  /*************calculos ***********/

  /*********** CREANDO UN SERVICIO SUSCRIBIBLE PARA EL GRAN TOTAL ***********/

  private totalCart: Subject<number> = new Subject<number>(); //Parametro por defecto falso

  /** CREANDO LOS SETTER Y GETTER */

  getTotalCartObservable() {
    return this.totalCart.asObservable();
  }

  setTotalCart(value: number) {
    this.totalCart.next(value);
  }

  elementos: number[] = [];
  arr: any;
  precioEncontrado: boolean = false;
  prices: any;
  price: number = 0;
  price_unit: number = 0;
  descuentos: number = 0;
  subtotal: number = 0;
  total_promo: number = 0;
  total: number = 0;
  setPrice: any;
  product: any;

  round05(number: number){
    let rounded = Math.round(number * 2) / 2;
  
    // Si el resultado es un número entero, restar 0.05
    // if (Number.isInteger(rounded) && rounded > 0) {
    //   rounded -= 0.05;
    // }
    
    return rounded;
  }

  elementosRepetidos(itemCart: any) {

    this.elementos = [];

    //iteramos todos los elementos del carrito de compras y generamos un array de la siguiente forma
    //array = [1, 2, 3, 4, 1, 2, 1];

    itemCart.forEach((item: any) => {
      // console.log('imprimiendo el product_id');
      // console.log(item.product_id);
      for (let index = 0; index < item.quantity; index++) {
        this.elementos.push(item.product_id);
      }
    });

    //devolvemos los elementos repetidos

    let i = 0;

    let keyRepeats = this.elementos.reduce(
      (acc: any, product_id: number, index) => {
        if (product_id in acc) {
          //si encuentra un elemento repetido (porque ya lo encontro anteriormente en 1)
          acc[product_id]++;
        } else {
          //si encuentra un elemento por primera vez ----(1)
          acc[product_id] = 1;

          //Aqui es donde se encuentra por primera vez un elemento nuevo
          console.log(index);
          // this.position[i] = index; //la posicion del elemento en el itemCart

          i++;
        }

        return acc;
      },
      {}
    );

    // console.log(itemsKeysRepeats);
    // ejemplo {6: 3, 7: 3} donde el 6 y 7 son id de productos y 3 y 3 son las veces que se repite

    // console.log('imprimiendo las posiciones...');

    // console.log(this.position);

    console.log(
      '(cart.component.ts) Imprimiendo en formato de objeto con los elementos repetidos'
    );

    // console.log(count);

    this.arr = [];

    console.log('(cart.component.ts) imprimiendo los elementos del carrito');

    console.log(itemCart);

    for (let product_id in keyRepeats) {
      //buscamos el precio del product_id correspondiente, ojo key es el product_id
      this.precioEncontrado = false;

      const BreakError = {};

      //(1) primero debemos encontrar this.prices

      this.prices = [];

      try {

        itemCart.forEach((element: any) => {
          if (element.product_id == product_id) {
            //se encontro el elemento y apartir de aqui extraemos la lista de precios
            console.log(
              '(1/2): el listado de precios para el product_id ' +
                product_id +
                ' es'
            );
            // console.log(element.prices);
            this.precioEncontrado = true;

            if (typeof element.prices !== 'undefined') {
              console.log('prices si esta definido');
              this.prices = element.prices;
            } else {
              console.log('prices no esta definido');

              this.price_unit = element.price;
              console.log(this.price_unit);
            }

            throw BreakError; //Termina el foreach
          }
        });
      } catch (err) {
        // console.log('ha ocurrido un error interno');
      }

      //(2) una vez encontrado this.prices vamos a determinar el precio unitario

      try {
        this.prices.forEach((price: any) => {
          if (price.quantity == 1) {
            //se encontro el elemento y apartir de aqui extraemos la lista de precios
            this.price = price.value;
            throw BreakError; //Termina el foreach
          }
        });
      } catch (err) {
        console.log('no es posible iterar prices porque no existe');
      }

      try {
        this.prices.forEach((price: any) => {
          if (price.quantity == keyRepeats[product_id]) {
            this.setPrice = price.value;
            console.log(
              '(2/2): se encontro el precio del product_id ' +
                product_id +
                ' y este es...'
            );
            console.log(this.setPrice);

            throw BreakError;
          } else {
            this.setPrice = this.price;
          }
        });
      } catch (err) {
        console.log('no esta definido los precios (this.prices) en promocion');
      }

      if (this.setPrice > 0) {
      } else {
        this.setPrice = this.price_unit;
      }

      this.product = [
        {
          product_id: product_id,
          repetidos: keyRepeats[product_id],
          price: this.setPrice,
        },
      ];

      this.arr.push(this.product[0]);
    }

    return this.arr;

  }

  costos() {

    let itemCart = this.getItems();

    if (itemCart) {

      this.subtotal = 0;

      //calculamos el subtotal y...
      itemCart.forEach((item: any) => {
        this.subtotal += item.subtotal; //subtotal ya esta en el localStorage
        // console.log("imprimiendo el subtotal parcial");
        // console.log(parseFloat(this.subtotal.toFixed(2)));
      });

      console.log("total lista");
      
      console.log(this.subtotal);
      

      //....seteando el valor del total car para todos los suscribes

      this.arr = this.elementosRepetidos(itemCart);

      console.log(
        '(cart.service.ts): xximprimiendo los elementos repetidos con su precio oferta'
      );

      console.log(this.arr);

      this.total_promo = 0;

      this.arr.forEach((element: any) => {

        console.log(element.price);
        
        this.total_promo += element.price * element.repetidos;
      });

      console.log("total promo");
      console.log(this.round05(this.total_promo));
      
      this.descuentos = parseFloat(this.subtotal.toFixed(2)) - this.total_promo;

      console.log("descuentos");
      console.log(this.round05(this.descuentos));

      if (this.descuentos > 0) {
      } else {
        this.descuentos = 0;
      }

      // this.setTotalCart(this.total_promo);

      const result = {
        descuentos: this.descuentos,
        total_promo: this.total_promo,
        sub_total: this.subtotal,
      }

      console.log(result);
      
      return result;

    } else {

      return {
        descuentos: 0.0,
        total_promo: 0.0,
        sub_total: 0.0,
      };

    }
  }
}
