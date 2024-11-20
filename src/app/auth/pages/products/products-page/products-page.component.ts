import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "./../../../../header/header.component";
import { ProductService } from './../../../../services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StoreService } from './../../../../services/store.service';
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import Swal from 'sweetalert2';
import { ButtonProductCreateModalComponent } from "../../../../components/buttons/button-product-create-modal/button-product-create-modal.component";
import { ProductsTableComponent } from "../../../../components/products/products-table/products-table.component";

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LoadingCenterComponent, ButtonProductCreateModalComponent, ProductsTableComponent],
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontro el listado de productos',
        });
      
        console.error('Error al obtener la información:', err);
      },

    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
  
}
