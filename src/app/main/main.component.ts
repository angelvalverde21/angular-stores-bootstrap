import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';
import { LoadingCenterComponent } from "../components/loading-center/loading-center.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, LoadingCenterComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  store: string = '';
  products: [] = [];
  loadingVerification: boolean = true;
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
        this.loadingVerification = false;
      });

    });

}

}
