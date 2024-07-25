import {Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LogoComponent } from "../components/logo/logo.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, RouterModule],
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
