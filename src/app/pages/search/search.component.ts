import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HeaderComponent } from '../../header/header.component';
import { ProductsComponent } from '../../components/products/products.component';
import { FooterComponent } from '../../footer/footer.component';
import { SetterGetterService } from '../../services/setter-getter.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, ProductsComponent, FooterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  store: string = '';
  search: string = '';

  //Consultamos a la base de datos la informacion del perfil y productos
  constructor(
    private _storeService: StoreService,
    private _productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _commonService: CommonService
  ) {
    console.log('Buscando productos');

    this.cargarResultados();
    // this.store = this._storeService.getSlug();
  }

  cargarResultados(){
    
  this.route.params.subscribe(params => {

    this.search = params['search']; //el parametro base es store
    this.store = params[environment.parametroBase]; //el parametro base es store

    if (this.search) {
      //setea el nombre de la tienda
      console.log('se esta buscando ' + this.search);
      // this._storeService.setSlug(search);
    }

    this._storeService.search(this.store, this.search).subscribe({

      next: (resp: any) => {
        // Manejo de la respuesta exitosa
        console.log(resp);
  
        console.log('llamando a search.component');
  
        this._productService.setProducts(resp.data);

        this._commonService.setIconLoading(false);
      },
  
      error: (err: any) => {
        // Manejo del error
        this.router.navigate(['/error-404']);
        console.error('Error al obtener la información de search:', err);
      },

    });

  });
  }

}
