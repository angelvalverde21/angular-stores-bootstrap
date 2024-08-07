import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
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
  
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {

      const store = params.get(environment.parametroBase); //el parametro base es store
      if (store) {
        //setea el nombre de la tienda
        this._routeService.setStore(store);

        //Consultamos a la base de datos la informacion del perfil y productos
        this._storeService.getHome(store).subscribe((data:any) => {
          // this.products = data.products;
          console.log(data);
          //ahora que tenemos la informacion en data lo seteamos en un servicio
          this._productService.setProducts(data.products);
        }); 
      }

    });

  }

}