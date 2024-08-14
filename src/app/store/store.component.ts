import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

    // private _productService: ProductService,
    // private router: Router
  ) {
    // this._storeService.setSlugBase().subscribe((resp: any) => {

    //   console.log('ingresamos correctamente al store.component');
      
    //   console.log(localStorage.getItem('slug_base'));
      
    // });

    // this.route.params.subscribe((params) => {

    //   const store = params[environment.parametroBase]; //el parametro base es store
    //   console.log('valor inicial ' + store);

    //   this._storeService.setSlugBase(store).subscribe((resp: any) => {

    //       console.log('el slug base ha sido seteado correctamente');
          
    //   });

    // });

  }
  
  // ngOnInit(): void {

  // }
}
