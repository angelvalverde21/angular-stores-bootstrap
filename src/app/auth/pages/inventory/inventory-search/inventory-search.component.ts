import { Component } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HeaderComponent } from '../../../../header/header.component';
import { FooterComponent } from '../../../../footer/footer.component';
import { CommonService } from '../../../../services/common.service';
import { CatalogoComponent } from "../../../../components/catalogo/catalogo.component";
import { TableProductsComponent } from "../../../../components/products/table-products/table-products.component";

@Component({
  selector: 'app-inventory-search',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CatalogoComponent, TableProductsComponent],
  templateUrl: './inventory-search.component.html',
  styleUrl: './inventory-search.component.css'
})
export class InventorySearchComponent {

  constructor(
    private _store: StoreService,
    private _productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _common: CommonService
  ) {
    console.log('Search inventory');

    this._common.setCardPlaceHolder(true);
    this._common.setShowSearch(true);
    this.cargarResultados();
    // this.store = this._storeService.getSlug();
  }

  store: string = '';
  search: string = '';

  cargarResultados() {

    // console.log('imprimiendo search');
    // console.log(this.route.snapshot.paramMap.get('search'));
    // console.log(this.route.snapshot.paramMap.get('auth'));
    // console.log(this.route.parent?.parent?.snapshot.paramMap.get('store'));
    // console.log('imprimiendo search');
    
    this.route.parent?.parent?.params.subscribe((params) => {
      //recibe el nombre del store desde la ruta padre

      console.log('imprimiendo valores recibidos de route.parent?.params');

      console.log(params);

      const name = params[environment.parametroBase];

      console.log('el campo buscado es xxx ' + name);

      this.route.params.subscribe((params) => {
        //recibe el parametro del mismo componente (que no es el padre)

        console.log(params);
        console.log(name);
        console.log('empezando a solicitar la busqueda');

        this.search = params['search']; //el parametro base es store

        this._store.search(name, this.search).subscribe({

          next: (resp: any) => {
            // Manejo de la respuesta exitosa
            console.log(resp);

            console.log('llamando a search.component');

            this._productService.setProducts(resp.data);

            this._common.setIconLoading(false);
          },

          error: (err: any) => {
            // Manejo del error
            this.router.navigate(['/error-404']);
            console.error('Error al obtener la información de search:', err);
          },
        });

      });


    });



  }
}
