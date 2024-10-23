import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingComponent } from '../../loading/loading.component';
import { InputGroupComponent } from '../../forms/input-group/input-group.component';
import { ProductService } from '../../../services/product.service';
import { ItemColorSizeIndexComponent } from "../../Order/item/item-color-size-index/item-color-size-index.component";

@Component({
  selector: 'app-input-search-product',
  standalone: true,
  imports: [InputGroupComponent, LoadingComponent, CommonModule, ItemColorSizeIndexComponent],
  templateUrl: './input-search-product.component.html',
  styleUrl: './input-search-product.component.css',
})

export class InputSearchProductComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  products: any[] = [];
  product_id: number = 0;
  productsSubscription!: Subscription;
  searchSubject: Subject<string> = new Subject();
  // @Output() eventProduct = new EventEmitter<number>();
  
  constructor(private _product: ProductService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(500)) // Retrasa la búsqueda 300ms después del último evento
      .subscribe((searchTerm: string) => {
        this.search(searchTerm);
      });
  }

  search(search: any) {
    this.loading = true;
    this.productsSubscription = this._product
      .getAllSearch(search)
      .subscribe((resp: any) => {
        this.products = resp.data;
        this.loading = false;
      });
  }

  keyUpSearch($event: any) {
    // this.loading = true;
    this.product_id = 0;
    const searchTerm = $event.target.value;

    if (searchTerm.length > 3) {
      this.searchSubject.next(searchTerm); // Emite el término de búsqueda
    }
  }

  selectProduct(product_id: number){
    // this.eventProduct.emit(product_id);
    this.product_id = product_id;
    this.products = [];
  }

  ngOnDestroy(): void {}
}
