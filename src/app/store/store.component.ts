import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent implements AfterViewInit {
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
  ngAfterViewInit(): void {
    console.log('Se ha pasado por el storeComponent.ts ');
  }
}
