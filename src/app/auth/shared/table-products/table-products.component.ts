import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../../shared/pipes.module';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, //para los links
    PipesModule,
    LoadingComponent,
],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.css'
})

export class TableProductsComponent implements OnInit, OnDestroy{

  count: number = 0;
  @Input() products: any[] = []; 
  // loading: boolean = true;
  productsEncontrados: boolean =  false;
  store: string = "";



  constructor(
    private _store: StoreService
  ) {

  }

  ngOnInit(): void {

    this.store = this._store.leerSlugBase()!;
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log('Data received', data);
    // });

    // this._product.getAll().subscribe((resp: any) => {
    //   this.loading = false;
    //   this.products = resp;
    // });

    // this._commonService.setCardPlaceHolder(false);

    console.log('table-products');
    
    console.log(this.products);
    

    if (this.products.length > 0) {
      this.productsEncontrados = true;
    }
  }

  ngOnDestroy(): void {
    // this.productsSubscription.unsubscribe();
    // this.commonSubscription.unsubscribe;
  }


}
