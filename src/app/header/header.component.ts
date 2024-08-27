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
import { AuthService } from '../services/auth.service';
import { ButtonLogoutComponent } from "../components/buttons/button-logout/button-logout.component";
import { User } from '../interfaces/user.interface';
import { PipesModule } from '../shared/pipes.module';

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
    ButtonLogoutComponent,
    PipesModule
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
  estaAutenticado: boolean = false;
  user: any;

  // links : {}[] = [];
  // authLinks : {}[] = [];
  // store: string = '';

  @ViewChild('offcanvasExample', { static: false })
  offcanvasElement!: ElementRef;

  constructor(

    private _cart: CartService,
    private _common: CommonService,
    private _store: StoreService,
    private _auth: AuthService,

  ) {
    // this.store = this._store.getSlug();

    if(this._auth.estaAutenticado()){
      this.estaAutenticado = true;
      this.user = this._auth.user();
      console.log(this.user.name);
      
    }

    this._common.getShowSearchObservable().subscribe((value: boolean) => {
      this.showSearch = value;
      console.log('escuche el valor seteado y es ' + value);
    });

    //Espera el nombre del componente padre, que en este caso es home
    this._store.getNameObservable().subscribe((store: string) => {
      console.log(store + ' desde header');
      this.store = store;

      // this.links = [
      //   { path: `/${this.store}`, label: 'Home', exact: true },
      //   { path: `/${this.store}/tracking`, label: 'Tracking', exact: false }
      // ];
    
      // this.authLinks = [
      //   { path: `/${this.store}`, label: 'Orders', exact: true },
      //   { path: `/${this.store}/tracking`, label: 'Tracking', exact: false }
      // ];
      
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
