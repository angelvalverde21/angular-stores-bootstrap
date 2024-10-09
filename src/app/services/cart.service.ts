import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor() {
    // console.log('servicio cargado');
  }

  items: any[] = [];

  addItem(item: any) {
    // Verifica si ya hay elementos en 'cartItems'
    const cartItemsString = localStorage.getItem('cartItems');
    
    if (cartItemsString != null) {
      // Convierte la cadena a un array de objetos JSON
      this.items = JSON.parse(cartItemsString); 
    } else {
      // Inicializa 'this.items' como un array vacío si no hay datos
      this.items = [];
    }
  
    // Agrega el nuevo item
    this.items.push(item);
    
    // Vuelve a setear los elementos del carrito en localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }


  getItems(){
    if (localStorage.getItem('cartItems') != null) {
       return JSON.parse(localStorage.getItem('cartItems')!);
    } else {
      return [];
    }
  }

  setItems(items:any){
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
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

}