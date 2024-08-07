import {Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LogoComponent } from "../components/logo/logo.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonLoginComponent } from "../components/buttons/button-login/button-login.component";
import { ButtonRegisterComponent } from "../components/buttons/button-register/button-register.component";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, RouterModule, ButtonLoginComponent, ButtonRegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  // store: string = '';

  @ViewChild('offcanvasExample', { static: false }) offcanvasElement!: ElementRef;

  constructor(
    private _cartService: CartService
  ) {}

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
