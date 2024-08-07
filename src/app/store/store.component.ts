import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouteService } from '../services/route.service';
import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  store: string = "";
  products: [] = [];
  
  constructor(
    private route: ActivatedRoute, 
    private _routeService: RouteService, 
    private _storeService: StoreService,
    private _productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {

      const store = params.get(environment.parametroBase); //el parametro base es store
      if (store) {
        //setea el nombre de la tienda
        this._routeService.setStore(store);

        //Consultamos a la base de datos la informacion del perfil y productos
        this._storeService.getHome(store).subscribe({

          next: (resp: any) => {
            // Manejo de la respuesta exitosa
            this._productService.setProducts(resp.data.products);
          },
          error: (err: any) => {
            // Manejo del error
            this.router.navigate(['/error-404']);
            console.error('Error al obtener la información:', err);
          }

        }); 
      }

    });

  }

}