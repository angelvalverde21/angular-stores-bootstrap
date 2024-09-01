import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../components/loading/loading.component";
import { StoreService } from '../../../services/store.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LoadingComponent, RouterModule,],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit, OnDestroy{

  public products: any = [];
  public loading: boolean = true;
  productsEncontrados: boolean = false;
  private productsSubscription!: Subscription;
  public store: string = "";

  constructor(private _store: StoreService){

  }

  ngOnInit(): void {

    this.store = this._store.leerSlugBase()!;

    this.productsSubscription = this._store.inventory()
    
    .subscribe({

      next: (resp: any) => {
      
        console.log('Empezo la suscripcion a products.component');
        // console.log(resp);
        // this.products = data.products;

        // console.log('llamando a products');
        this.loading = false;
        // this._commonService.setCardPlaceHolder(false);
        // console.log('loading es ' + this.loading);
        this.products = resp.data;
        console.log(this.products);
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
    
  }
  

}
