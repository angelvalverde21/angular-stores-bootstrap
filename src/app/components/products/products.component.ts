import { Component } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductComponent, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: any = [];
  loading: boolean = true;

  constructor(
    private _product: ProductService
  ) {
    console.log('se ingreso al home');

    // this.loading = true;
    // this._console.log('loading es true');

    // this._product.getAll()
    // .subscribe ( (data: any) => {
    //   this._console.log(data);

    //   this.productos = data;
    //   this.loading = false
    //   // this.loading   = false;
    // });

    this._product.getAll().subscribe((resp: any) => {
      console.log(resp);
      this.loading = false;
      this.products = resp;
      console.log('productos cargados');
      
    });
  }

}
