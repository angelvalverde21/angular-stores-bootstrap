import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LogoComponent } from '../components/logo/logo.component';
import { RouterModule } from '@angular/router';
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
import { PipesModule } from '../shared/pipes.module';
import { HeaderMiddleComponent } from "./header-middle/header-middle.component";
import { HeaderBottomComponent } from "./header-bottom/header-bottom.component";
import { ButtonOpenCanvasSearchComponent } from "../components/buttons/button-open-canvas-search/button-open-canvas-search.component";
import { ButtonSidebarComponent } from "../auth/button-sidebar/button-sidebar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    RouterModule,
    CommonModule,
    PipesModule,
    HeaderMiddleComponent,
    HeaderBottomComponent,
    ButtonOpenCanvasSearchComponent,
    ButtonSidebarComponent
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

export class HeaderComponent implements OnInit, OnDestroy{

  showSearch : boolean = false;
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

    // this._common.getShowSearchObservable().subscribe((value: boolean) => {
    //   this.showSearch = value;
    //   console.log('escuche el valor seteado y es ' + value);
    // });

    //Espera el nombre del componente padre, que en este caso es home
    // this._store.getNameObservable().subscribe((store: string) => {
    //   console.log(store + ' desde header');
    //   this.store = store;
    // });

  }

  ngOnInit(): void {
    console.log('seteando el nombre');
    
    this.store = this._store.name()!;
  }

  changeShowSearch($event:any){
    this.showSearch = $event;
  }

  ngOnDestroy(): void {
    // this.store = "";
  }
}
