import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent{
  store: string = '';
  products: [] = [];
  loadingVerification: boolean = true;
  constructor(
    // private _productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _store: StoreService,
    private _common: CommonService,  
  ) {

    this._common.setCardPlaceHolder(true);
    /*
    | -------------------------------------
    | Seteo global del nombre de la tienda
    | -------------------------------------

    */


    
  }

  // ngOnInit(): void {

  // }

  /**************** para recibir el slugbase con el resolve *******************/

  // constructor(private route: ActivatedRoute, private router: Router) {}

  // ngOnInit(): void {
  //   // Obtén los datos del resolver
  //   this.route.data.subscribe(data => {
  //     this.slugBase = data['slugBase'];

  //     if (this.slugBase === null) {
  //       // Redirige a una página de error si el slugBase es null
  //       this.router.navigate(['/error-404']); // Ajusta la ruta al componente de error
  //     } else {
  //       // Maneja el slugBase válido aquí
  //       console.log('Slug Base:', this.slugBase);
  //     }
  //   });
  // }
  
  // ngAfterViewInit(): void {
  //   console.log('Se ha pasado por el storeComponent.ts ');
  // }

  /**************** para recibir el slugbase con el resolve *******************/


  // private handleParams(params: any) {

  //   const slugBase = params[environment.parametroBase];

  //   this._store.isValid(slugBase).pipe(
  //     switchMap((isValid: boolean) => {
  //       if (isValid) {
  //         this._store.setName(slugBase);
  //       }
  //       return of(isValid);
  //     })
  //   ).subscribe();
  // }
  
  // constructor(private _route: ActivatedRoute, private _store: StoreService) {

  // }
}
