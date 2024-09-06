import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../../shared/pipes.module';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { CardPlaceHolderComponent } from '../../../components/card-place-holder/card-place-holder.component';
import { CommonService } from '../../../services/common.service';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    LoadingComponent,
    CardPlaceHolderComponent
],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.css'
})

export class TableProductsComponent implements OnInit, OnDestroy{

  count: number = 0;
  @Input() products: any[] = []; 
  loading: boolean = true;
  productsEncontrados: boolean =  false;
  store: string = "";
  private commonSubscription!: Subscription;


  
  constructor(
    private _products: ProductService,
    private _commonService: CommonService,
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

    this.commonSubscription = this._commonService.getCardPlaceHolderObservable().subscribe((value:boolean) => {

      this.count  = this.count + 1;
      console.log('contador');
      
      console.log(this.count);

      console.log('el valor actual de value es ' + value);
      
      this.loading = value;

    });

    
    this._commonService.setCardPlaceHolder(false);

    console.log('table-products');
    
    console.log(this.products);
    

    if (this.products.length > 0) {
      this.productsEncontrados = true;
    }
  }

  ngOnDestroy(): void {
    // this.productsSubscription.unsubscribe();
    this.commonSubscription.unsubscribe;
  }


}
