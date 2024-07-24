import {Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @ViewChild('offcanvasExample', { static: false }) offcanvasElement!: ElementRef;

  constructor(private _cartService: CartService) {}

  ngAfterViewInit() {
    if (this.offcanvasElement) {
      console.log('offcanvasElement cargado');
      this._cartService.initializeOffcanvas(this.offcanvasElement);

    } else {
      console.log('offcanvasElement noooooooo cargado');
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
