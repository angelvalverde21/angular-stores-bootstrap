import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { LoadingCenterComponent } from "../../../components/loading-center/loading-center.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { SkuService } from '../../../services/sku.service';
import { FormSearchComponent } from "../../../components/form-search/form-search.component";
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-search-sku-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, CommonModule, FormSearchComponent, RouterModule],
  templateUrl: './search-sku-page.component.html',
  styleUrl: './search-sku-page.component.css'
})
export class SearchSkuPageComponent implements OnInit {

  sku: any;
  store: string = '';
  search: string = '';
  loading: boolean = true;
  private searchSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _sku: SkuService,
    private _common: CommonService,
    private _store: StoreService
  ) {
    console.log('Search inventory');
    // this.store = this._storeService.getSlug();
  }

  
  ngOnInit(): void {
    this._common.setCardPlaceHolder(true);
    this._common.setShowSearch(true);
    this.cargarResultados();

    this.store = this._store.getName();

  }

  cargarResultados() {

    // console.log('imprimiendo search');
    // console.log(this.route.snapshot.paramMap.get('search'));
    // console.log(this.route.snapshot.paramMap.get('auth'));
    // console.log(this.route.parent?.parent?.snapshot.paramMap.get('store'));
    // console.log('imprimiendo search');

    this.route.params.subscribe((params) => {
    
      console.log("log desde search");
      
      console.log(params);

      this.searchSubscription = this._sku.search(params['search']).subscribe({

        next: (resp: any) => {
          // Manejo de la respuesta exitosa

          this.loading = false;
          this.sku = resp.data;
          console.log(this.sku);
          console.log('llamando a search.component');
          this._common.setIconLoading(false);
        },

        error: (err: any) => {
          // Manejo del error
          this.router.navigate(['/error-404']);
          console.error('Error al obtener la información de este sku: ' + this.search, err);
        },
      });
    });

  }

}
