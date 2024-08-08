import {Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LogoComponent } from "../components/logo/logo.component";
import { RouterModule } from '@angular/router';
import { ButtonLoginComponent } from "../components/buttons/button-login/button-login.component";
import { ButtonRegisterComponent } from "../components/buttons/button-register/button-register.component";
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, RouterModule, ButtonLoginComponent, ButtonRegisterComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showSearch: boolean = false;
  // store: string = '';

  @ViewChild('offcanvasExample', { static: false }) offcanvasElement!: ElementRef;

  constructor(
    private _cartService: CartService,
    private _storeService: StoreService,
    private _productService: ProductService
  ) {

    

  }

  searchProduct(event: any){
    const search = event.target.value; // Captura el valor del input
    // console.log(inputValue); // 

    this._storeService.search(this._storeService.getSlug(), search).subscribe({
      next: (resp: any) => {
        // Manejo de la respuesta exitosa
        // console.log(resp.data);

        console.log('respuesta para el buscador');

        this._productService.setProducts(resp.data);
      },
      error: (err: any) => {
        // Manejo del error
        console.error('No hay resultados', err);
      },
    });

  }
  
  openSearch(){
    console.log('click');
    
    this.showSearch = !this.showSearch;
  }

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
