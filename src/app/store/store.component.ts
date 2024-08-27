import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent{
  store: string = '';
  products: [] = [];

  constructor(
    // private _productService: ProductService,
    private router: Router,
    private _route: ActivatedRoute,
    private _store: StoreService
  ) {

    // console.log('xxxxxxxxxx respuesta del slug base de  storeComponent.ts ');

    //* Primero llamamos para verificar si existe la tienda en la base de datos **/
    this._route.params.subscribe((params: any) => {
      const slugBase = params[environment.parametroBase]; //el parametro base es store
      console.log('valor inicial ' + slugBase);

      //usamos un suscribe porque para determinar que es slugBase es correcto, tomara un poco de tiempo por eso usamos un suscribe, la respuesta es verdadero o falso
      this._store.isValid(slugBase).subscribe((isValid: boolean) => {
        this._store.setName(slugBase);
      });
    });
    
  }

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
