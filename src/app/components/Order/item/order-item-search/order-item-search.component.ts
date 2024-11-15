import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputGroupComponent } from "../../../forms/input-group/input-group.component";
import { LoadingComponent } from "../../../loading/loading.component";
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-item-search',
  standalone: true,
  imports: [InputGroupComponent, LoadingComponent, CommonModule, FormsModule],
  templateUrl: './order-item-search.component.html',
  styleUrl: './order-item-search.component.css'
})
export class OrderItemSearchComponent implements OnInit, OnDestroy{

  loading: boolean = false;
  products: any[] = [];
  productsSubscription!: Subscription;
  searchSubject: Subject<string> = new Subject();

  constructor(private _product: ProductService){}

  ngOnInit(): void {
    this.searchSubject
    .pipe(debounceTime(500))  // Retrasa la búsqueda 300ms después del último evento
    .subscribe((searchTerm: string) => {
      this.search(searchTerm);
    });
  }

  search(search : any){

    this.loading = true;
    this.productsSubscription = this._product.getAllSearch(search).subscribe((resp:any) => {
      this.products = resp.data;
      this.loading = false;
    });

  }

  keyUpSearch($event: any) {
    // this.loading = true;
    const searchTerm = $event.target.value;

    if (searchTerm.length > 3) {
      this.searchSubject.next(searchTerm); // Emite el término de búsqueda
    }
  }
  
  ngOnDestroy(): void {

  }



}
