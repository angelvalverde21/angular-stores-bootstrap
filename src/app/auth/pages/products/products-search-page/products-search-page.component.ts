import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HeaderComponent } from '../../../../header/header.component';
import { CommonService } from '../../../../services/common.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { ProductsTableComponent } from "../../../../components/products/products-table/products-table.component";
@Component({
  selector: 'app-products-search-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LoadingCenterComponent, ProductsTableComponent],
  templateUrl: './products-search-page.component.html',
  styleUrl: './products-search-page.component.css'
})
export class ProductsSearchPageComponent implements OnInit, OnDestroy{
  products: any[] = [];
  store: string = '';
  search: string = '';
  loading: boolean = true;
  private searchSubscription!: Subscription;

  constructor(
    private _product: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _common: CommonService
  ) {
    console.log('Search inventory');


    // this.store = this._storeService.getSlug();
  }

  ngOnInit(): void {
    this._common.setCardPlaceHolder(true);
    this._common.setShowSearch(true);
    this.cargarResultados();

  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

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

        this.loading = true;

        this.searchSubscription = this._product.getAllSearch(this.search).subscribe({

          next: (resp: any) => {
            // Manejo de la respuesta exitosa

            this.loading = false;
            this.products = resp.data;
            console.log(resp);
            console.log('llamando a search.component');
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
