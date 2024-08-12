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
  styleUrl: './store.component.css',
})
export class StoreComponent {
  store: string = '';
  products: [] = [];

  constructor(
    private route: ActivatedRoute,
    private _storeService: StoreService,
    // private _productService: ProductService,
    // private router: Router
  ) {
    // this._storeService.setSlugBase().subscribe((resp: any) => {

    //   console.log('ingresamos correctamente al store.component');
      
    //   console.log(localStorage.getItem('slug_base'));
      
    // });
    this.route.params.subscribe((params) => {

      const store = params[environment.parametroBase]; //el parametro base es store

      this._storeService.setSlugBase(store).subscribe((resp: any) => {

          console.log('SE HA COMPROBADO EL SETSLUGBASE');
          

      });

    });
  }


  


  // ngOnInit(): void {

  // }
}
