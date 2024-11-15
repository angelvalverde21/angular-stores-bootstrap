import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingComponent } from '../../loading/loading.component';
import { InputGroupComponent } from '../../forms/input-group/input-group.component';
import { ProductService } from '../../../services/product.service';
import { ItemColorSizeIndexComponent } from "../../Order/item/item-color-size-index/item-color-size-index.component";
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-input-search-product',
  standalone: true,
  imports: [InputGroupComponent, LoadingComponent, CommonModule, ItemColorSizeIndexComponent],
  templateUrl: './input-search-product.component.html',
  styleUrl: './input-search-product.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class InputSearchProductComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  products: any[] = [];
  product: any;
  product_id: number = 0;
  productsSubscription!: Subscription;
  searchSubject: Subject<string> = new Subject();
  // @Output() eventProduct = new EventEmitter<number>();
  @Input() order_id: number = 0;
  
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
    this.product = null;
    const searchTerm = $event.target.value;

    if (searchTerm.length > 3) {
      this.searchSubject.next(searchTerm); // Emite el término de búsqueda
    }
  }

  selectProduct(product_id: number){
    // this.eventProduct.emit(product_id);
    this.product = this.products.find((product:any) => product.id == product_id) || null;
    this.products = [];
  }

  clearColors(){
    this.product = null;
  }

  ngOnDestroy(): void {}
  
}
