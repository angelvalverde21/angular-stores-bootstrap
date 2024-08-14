import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LogoComponent } from '../components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { ButtonLoginComponent } from '../components/buttons/button-login/button-login.component';
import { ButtonRegisterComponent } from '../components/buttons/button-register/button-register.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { FormSearchComponent } from '../components/form-search/form-search.component';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import {
  trigger,
  style,
  state,
  animate,
  transition,
} from '@angular/animations';
import { CommonService } from '../services/common.service';

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
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('searchTransition', [
      state(
        'hidden',
        style({
          opacity: 0,
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          height: '*',
          overflow: 'hidden',
        })
      ),
      transition('hidden <=> visible', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class HeaderComponent {
  showSearch: boolean = false;
  store: string = '';

  // store: string = '';

  @ViewChild('offcanvasExample', { static: false })
  offcanvasElement!: ElementRef;

  constructor(
    private _cart: CartService,
    private _common: CommonService,
    private _store: StoreService
  ) {
    // this.store = this._store.getSlug();

    this._common.getShowSearchObservable().subscribe((value: boolean) => {
      this.showSearch = value;
      console.log('escuche el valor seteado y es ' + value);
    });

    //Espera el nombre del componente padre, que en este caso es home
    this._store.getNameObservable().subscribe((store: string) => {
      console.log(store + ' desde header');
      this.store = store;
    });

  }

  openSearch() {
    console.log('click');
    this.showSearch = !this.showSearch;
  }

  ngAfterViewInit() {
    if (this.offcanvasElement) {
      // console.log('offcanvasElement cargado');
      this._cart.initializeOffcanvas(this.offcanvasElement);
    } else {
      // console.log('offcanvasElement noooooooo cargado');
    }
  }

  openCart() {
    console.log('click');
    this._cart.openCart();
  }

  closeCart() {
    this._cart.closeCart();
  }
}
