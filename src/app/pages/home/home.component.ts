import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProductsComponent } from '../../components/products/products.component';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // private subscription: Subscription;

  constructor(
    private _store: StoreService,
    private _product: ProductService,
    private _common: CommonService,
    private route: ActivatedRoute
  ) {
    // console.log('se llama a los productos');
    //Consultamos a la base de datos la informacion del perfil y productos
    // this.store = this._storeService.getSlug();

    console.log('se llamo a homeComponent');

    this._common.setCardPlaceHolder(true);

    // const slugBase = localStorage.getItem('slug_base')!;/

    this.route.parent?.params.subscribe((params) => {

      const slugBase = params[environment.parametroBase]; //el parametro base es store
      console.log('valor inicial ' + slugBase);

      //usamos un suscribe porque para determinar que es slugBase es correcto, tomara un poco de tiempo
      this._store.slugBase(slugBase).subscribe((resp: any) => {

        console.log('el valor que viene de ******** setSlugBase ');
        console.log(resp);

        this._store.setName(resp.name); //setea la url de la pagina web (StoreName)
        
        this._store.getHome(resp.name).subscribe((resp: any) => {

          //setea los productos para que se puedan mostrar
          this._product.setProducts(resp.data.products);

        });

      });
      
    });
  }
}
