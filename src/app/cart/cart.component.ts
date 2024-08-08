import {Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements AfterViewInit {

  @ViewChild('offcanvasExample', { static: false }) offcanvasElement!: ElementRef;

  constructor(private _cartService: CartService) {}

  ngAfterViewInit() {
    if (this.offcanvasElement) {
      // console.log('offcanvasElement cargado');
      this._cartService.initializeOffcanvas(this.offcanvasElement);

    } else {
      // console.log('offcanvasElement noooooooo cargado');
    }
  }

  openCart() {

    console.log('click');
    this._cartService.openCart();
    
  }

  closeCart() {
    this._cartService.closeCart();
  }

}