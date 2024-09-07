import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../components/loading/loading.component";
import { StoreService } from '../../../services/store.service';
import { RouterModule } from '@angular/router';
import { TableProductsComponent } from "../../shared/table-products/table-products.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LoadingComponent, RouterModule, ProductsComponent, TableProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy{

  loading: boolean = true;
  public products: any = [];
  productsEncontrados: boolean = false;
  private productsSubscription!: Subscription;
  public store: string = "";

  constructor(private _store: StoreService, private _product: ProductService){

  }

  ngOnInit(): void {

    this.store = this._store.leerSlugBase()!;

    this.productsSubscription = this._store.inventory()
    
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
