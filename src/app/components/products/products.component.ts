import { AfterViewInit, Component } from '@angular/core';
import { CardProductComponent } from '../cards/card-product/card-product.component';
import { CardColorComponent } from "../cards/card-color/card-color.component";
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../shared/pipes.module';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductComponent, CommonModule, RouterModule, CardColorComponent, PipesModule, LoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})

// export class ButtonLoginComponent implements OnInit {

export class ProductsComponent implements AfterViewInit{

  products: any = [];
  loading: boolean = true;

  constructor(
    private _product: ProductService,
  ) {

    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log('Data received', data);
    // });

    // this._product.getAll().subscribe((resp: any) => {
    //   this.loading = false;
    //   this.products = resp;
    // });
  
  }

  ngAfterViewInit(){

    this.products = this._product.getProductsObservable().subscribe((data:any) => {

      console.log('imprimiendo desde el componente products.ts');
      console.log(data);
      this.products = data.products;

    });

  }

}