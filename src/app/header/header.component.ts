import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LogoComponent } from '../components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { ButtonLoginComponent } from '../components/buttons/button-login/button-login.component';
import { ButtonRegisterComponent } from '../components/buttons/button-register/button-register.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { FormSearchComponent } from "../components/form-search/form-search.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    RouterModule,
    ButtonLoginComponent,
    ButtonRegisterComponent,
    LoadingComponent,
    FormSearchComponent,
    CommonModule
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showSearch: boolean = false;

  // store: string = '';

  @ViewChild('offcanvasExample', { static: false })
  offcanvasElement!: ElementRef;

  constructor(
    private _cartService: CartService,
  ) {}

  openSearch() {
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
