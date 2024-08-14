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
  // store: string = '';
  // search: string = '';

  //Consultamos a la base de datos la informacion del perfil y productos
  constructor(
    private _store: StoreService,
    private _productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _common: CommonService
  ) {
    console.log('Buscando productos');

    this._common.setCardPlaceHolder(true);
    this._common.setShowSearch(true);
    this.cargarResultados();
    // this.store = this._storeService.getSlug();
  }

  store: string = "";
  search: string = "";

  cargarResultados() {
    /***************************************** */

    this.route.parent?.params.subscribe((params) => { //recibe el nombre del store desde la ruta padre


      console.log('imprimiendo valores recibidos de route.parent?.params');
      

      console.log(params);
      
      this.store = params[environment.parametroBase]; 

      console.log('el campo buscado es xxx ' + this.store);

      this.route.params.subscribe((params) => { //recibe el parametro del mismo componente (que no es el padre)

        console.log(params);

        this.search = params['search']; //el parametro base es store

        this._store.slugBase(this.store).subscribe((resp: any) => {

          this._store.setName(resp.name); //setea la url de la pagina web (StoreName)

          this._store.search(this.store, this.search).subscribe({
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

    });
  }
}
