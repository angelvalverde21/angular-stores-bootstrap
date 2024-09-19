import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "./../../../../header/header.component";
import { ProductService } from './../../../../services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "./../../../../components/loading/loading.component";
import { StoreService } from './../../../../services/store.service';
import { RouterModule } from '@angular/router';
import { TableProductsComponent } from "./../../../shared/table-products/table-products.component";
import { ProductComponent } from '../../../shared/products/product/product.component';
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { ButtonProductsComponent } from "../../../../components/buttons/button-products/button-products.component";
import { ButtonOrdersComponent } from "../../../../components/buttons/button-orders/button-orders.component";

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LoadingComponent, RouterModule, TableProductsComponent, ProductComponent, LoadingCenterComponent, ButtonProductsComponent, ButtonOrdersComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  loading: boolean = true;
  public products: any = [];
  productsEncontrados: boolean = false;
  private productsSubscription!: Subscription;
  public store: string = "";

  constructor(private _store: StoreService, private _product: ProductService){

  }

  ngOnInit(): void {

    this.store = this._store.leerSlugBase()!;

    this.productsSubscription = this._product.getAll()
    
    .subscribe({

      next: (resp: any) => {
      
        console.log('Empezo la suscripcion a products.component');

        this.products = resp.data;
        // console.log(resp);
        // console.log('imprimiendo products de inventory');
        this.loading = false;
        // console.log(this.products);
        // console.log('contando ' + this.products.length)
        // this._product.setProducts(resp.data);
        
      },
  
      error: (err: any) => {
        // Manejo del error
        this.products = [];
        console.error('Error al obtener la información:', err);
      },

    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
  
}
