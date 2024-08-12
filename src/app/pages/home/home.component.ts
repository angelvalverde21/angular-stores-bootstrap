import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProductsComponent } from '../../components/products/products.component';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // store: string = '';

  constructor(
    private route: ActivatedRoute,
    private _storeService: StoreService,
    private _productService: ProductService,
    private _commonService: CommonService,
    private router: Router
  ) {
    // console.log('se llama a los productos');
    //Consultamos a la base de datos la informacion del perfil y productos
    // this.store = this._storeService.getSlug();

    this._commonService.setCardPlaceHolder(true);

    const slugBase = localStorage.getItem('slug_base')!;

    this._storeService.setSlugBase(slugBase).subscribe((resp: any) => {

      console.log('ingresamos correctamente al store.component');

      console.log(localStorage.getItem('slug_base'));

      this._storeService.getHome(slugBase).subscribe({
        next: (resp: any) => {
          // Manejo de la respuesta exitosa
          // console.log(resp.data);

          console.log('llamando a store.component');

          this._productService.setProducts(resp.data.products);
        },
        error: (err: any) => {
          // Manejo del error
          this.router.navigate(['error-404']);
          console.error('Error al obtener la información:', err);
        },
      });
    });
  }
}
