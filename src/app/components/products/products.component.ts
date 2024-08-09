import { Component } from '@angular/core';
import { CardProductComponent } from '../cards/card-product/card-product.component';
import { CardColorComponent } from '../cards/card-color/card-color.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../shared/pipes.module';
import { LoadingComponent } from '../loading/loading.component';
import { CardPlaceHolderComponent } from "../card-place-holder/card-place-holder.component";
import { CommonService } from '../../services/common.service';

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
  styleUrl: './products.component.css',
})

// export class ButtonLoginComponent implements OnInit {
export class ProductsComponent{

  products: any = [];
  loading: boolean = true;
  productsEncontrados: boolean =  false;

  constructor(
    private _productsService: ProductService,
    private _commonService: CommonService
  ) {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log('Data received', data);
    // });

    // this._product.getAll().subscribe((resp: any) => {
    //   this.loading = false;
    //   this.products = resp;
    // });

    this._commonService.getCardPlaceHolderObservable().subscribe((value:boolean) => {

      this.loading = value;

    })



    // console.log('loading deberia ser true');
    
    // console.log('loading es ' + this.loading);
    
    // console.log('FIN de loading deberia ser true');

    //Esta funcion trae los datos que en store.component.ts se setea
    this.products = this._productsService.getProductsObservable()
    
      .subscribe({

        next: (resp: any) => {
        
          console.log('imprimiendo desde el componente products.ts');
          console.log(resp);
          // this.products = data.products;
  
          // console.log('llamando a products');
        
          this._commonService.setCardPlaceHolder(false);
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

      });
  }


}
