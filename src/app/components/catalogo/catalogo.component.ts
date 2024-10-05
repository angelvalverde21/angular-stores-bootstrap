import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { CardProductComponent } from '../cards/card-product/card-product.component';
import { CardColorComponent } from '../cards/card-color/card-color.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../shared/pipes.module';
import { LoadingComponent } from '../loading/loading.component';
import { CardPlaceHolderComponent } from "../card-place-holder/card-place-holder.component";
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { Fancybox } from '@fancyapps/ui';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    CardProductComponent,
    CommonModule,
    RouterModule,
    CardColorComponent,
    PipesModule,
    LoadingComponent,
    CardPlaceHolderComponent
],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})

export class CatalogoComponent implements OnInit, OnDestroy{

  count: number = 0;
  products: any = [];
  phone: number = 945101774;
  store: any = [];
  loading: boolean = true;
  productsEncontrados: boolean =  false;
  estaAutenticado: boolean =  false;

  private commonSubscription!: Subscription;
  private productsSubscription!: Subscription;

  
  constructor(
    
    private _products: ProductService,
    private _common: CommonService,
    private _store: StoreService, //momentaneamente tenemos estevalor aqui
    private elRef: ElementRef,
    private _auth: AuthService
  ) {

  }

  ngOnInit(): void {

    //iniciamos fancybox
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });

    this.store = this._store.name();
    this.estaAutenticado = this._auth.estaAutenticado();

    this.phone = this._store.storeWarehouses().phone;

    this.commonSubscription = this._common.getCardPlaceHolderObservable().subscribe((value:boolean) => {

      this.count  = this.count + 1;
      console.log('contador');
      
      console.log(this.count);

      console.log('el valor actual de value es ' + value);
      
      this.loading = value;

    });

    this.productsSubscription = this._products.getProductsObservable()
    
    .subscribe({

      next: (resp: any) => {
      
        console.log('Empezo la suscripcion a products.component');
        console.log(resp);
        // this.products = data.products;

        // console.log('llamando a products');
      
        this._common.setCardPlaceHolder(false);
        // console.log('loading es ' + this.loading);
        this.products = resp;

        // console.log('contando ' + this.products.length)

        if (this.products.length > 0) {
          this.productsEncontrados = true;
        }
        
      },
  
      error: (err: any) => {
        // Manejo del error
        this.products = [];
        console.error('Error al obtener la información:', err);
      },

      //No se usa porque el observable no emite nunca complete
      // complete: () => {
      //   console.log('Termino la suscripcion a products.component');
      // },

    });
  }

  ngOnDestroy(): void {

    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.commonSubscription) {
      this.commonSubscription.unsubscribe();
    }

    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();

  }

}
