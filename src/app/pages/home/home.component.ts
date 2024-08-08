import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProductsComponent } from '../../components/products/products.component';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  store: string = "";

  constructor(
    private _storeService: StoreService,
    private _productService: ProductService,
    private router: Router,
    
  ) {
    console.log('se llama a los productos');
    //Consultamos a la base de datos la informacion del perfil y productos
    this.store = this._storeService.getSlug();

    this._storeService.getHome(this.store).subscribe({
      next: (resp: any) => {
        // Manejo de la respuesta exitosa
        // console.log(resp.data);

        console.log('llamando a store.component');

        this._productService.setProducts(resp.data.products);
      },
      error: (err: any) => {
        // Manejo del error
        this.router.navigate(['/error-404']);
        console.error('Error al obtener la información:', err);
      },
    });
    
  }
}


