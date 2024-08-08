import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { StoreService } from '../services/store.service';
import { ProductService } from '../services/product.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent{

  store: string = "";
  products: [] = [];
  
  constructor(
    private route: ActivatedRoute, 
    private _storeService: StoreService,
    private _productService: ProductService,
    private router: Router,

  ) {

    this.route.params.subscribe(params => {

      const store = params[environment.parametroBase]; //el parametro base es store

      if (store) {
        //setea el nombre de la tienda
        console.log('seteando el nombre del slug del store ' + store);
        
        this._storeService.setSlug(store);

      }

    });

  }

  // ngOnInit(): void {

  // }

}