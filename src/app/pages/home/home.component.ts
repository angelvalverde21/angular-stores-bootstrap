import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogoComponent } from "../../components/catalogo/catalogo.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CatalogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  // private subscription: Subscription;

  name: string = "";
  loading: boolean = false;

  constructor(
    private _store: StoreService,
    private _product: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // console.log('se llama a los productos');
    //Consultamos a la base de datos la informacion del perfil y productos
    // this.store = this._storeService.getSlug();

    console.log('se llamo a homeComponent');


    // const slugBase = localStorage.getItem('slug_base')!;/
    // this.name = this._store.name()!;
  }
  
  ngOnInit(): void {

    this.loading = true;

    this._store.getHome(this._store.getName()).subscribe({

      next: (resp:any) => {
        // Manejo de datos recibidos
        console.log(resp.message);
        this.loading = false;
        //setea los productos para que se puedan mostrar
        this._product.setProducts(resp.data);
  
      },
      error: (err) => {
        // Manejo del error
        this.router.navigate(['/','error-404']);
        console.error('Error al obtener los datos:', err);
      },

    });
  }
}
