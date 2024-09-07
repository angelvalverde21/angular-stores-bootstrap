import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../../../../services/store.service';
import { CommonService } from '../../../../../../services/common.service';
import { LoadingComponent } from '../../../../../../components/loading/loading.component';
import { TableProductsComponent } from '../../../../../shared/table-products/table-products.component';
import { HeaderComponent } from '../../../../../../header/header.component';
import { environment } from '../../../../../../../environments/environment';
import { ColorSizeComponent } from "../../../../../shared/color-size/color-size.component";

@Component({
  selector: 'app-inventory-search',
  standalone: true,
  imports: [HeaderComponent, TableProductsComponent, CommonModule, LoadingComponent, ColorSizeComponent],
  templateUrl: './inventory-search.component.html',
  styleUrl: './inventory-search.component.css'
})
export class InventorySearchComponent implements OnDestroy {

  products: any[] = [];
  store: string = '';
  search: string = '';
  loading: boolean = true;
  warehouse_id: number = 0;
  private searchSubscription!: Subscription;

  constructor(
    private _store: StoreService,
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

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  cargarResultados() {



    // console.log('imprimiendo search');
    // console.log(this.route.snapshot.paramMap.get('search'));
    // console.log(this.route.snapshot.paramMap.get('auth'));
    // console.log(this.route.parent?.parent?.snapshot.paramMap.get('store'));
    // console.log('imprimiendo search');
    
    this.route.parent?.params.subscribe((params) => {
      //recibe el nombre del store desde la ruta padre

      console.log('imprimiendo valores recibidos de route.parent?.params');

      console.log(params);

      this.warehouse_id = params['warehouse_id'];

      console.log('el campo buscado es xxx ' + name);

      this.route.params.subscribe((params) => {
        //recibe el parametro del mismo componente (que no es el padre)

        console.log(params);

        console.log('empezando a solicitar la busqueda');

        this.search = params['search']; //el parametro base es store

        this.loading = true;

        this.searchSubscription = this._store.search(this._store.leerSlugBase()!, this.search).subscribe((resp: any) => {
          this.loading = false;
          this.products = resp.data;
          console.log(resp);
          console.log('llamando a search.component');
          this._common.setIconLoading(false);
        });

      });

    });

  }
}
