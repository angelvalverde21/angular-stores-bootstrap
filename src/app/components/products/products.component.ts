import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-products',
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
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy{

  count: number = 0;
  products: any = [];
  loading: boolean = true;
  productsEncontrados: boolean =  false;
  store: string = "";
  private commonSubscription!: Subscription;
  private productsSubscription!: Subscription;

  
  constructor(
    private _productsService: ProductService,
    private _commonService: CommonService,
    private _store: StoreService
  ) {

  }

  ngOnInit(): void {

    this.store = this._store.leerSlugBase()!;
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log('Data received', data);
    // });

    // this._product.getAll().subscribe((resp: any) => {
    //   this.loading = false;
    //   this.products = resp;
    // });

    this.commonSubscription = this._commonService.getCardPlaceHolderObservable().subscribe((value:boolean) => {

      this.count  = this.count + 1;
      console.log('contador');
      
      console.log(this.count);

      console.log('el valor actual de value es ' + value);
      
      this.loading = value;

    });

    this.productsSubscription = this._productsService.getProductsObservable()
    
    .subscribe({

      next: (resp: any) => {
      
        console.log('Empezo la suscripcion a products.component');
        console.log(resp);
        // this.products = data.products;

        // console.log('llamando a products');
      
        this._commonService.setCardPlaceHolder(false);
        // console.log('loading es ' + this.loading);
        this.products = resp;

        console.log('imprimiendo desde el componente products');
        console.log(resp);
        

        // console.log('contando ' + this.products.length)
        this.productsEncontrados = true;
        // if (this.products.length > 0) {
          
        // }
        
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
    this.productsSubscription.unsubscribe();
    this.commonSubscription.unsubscribe;
  }


}
