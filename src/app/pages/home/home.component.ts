import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { CatalogoComponent } from "../../components/catalogo/catalogo.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CatalogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // private subscription: Subscription;

  name: string = "";

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
    // this.name = this._store.name()!;

    this.route.parent?.params.subscribe((params) => {
      // console.log(params['store']);
      this._store.getHome(params['store']).subscribe((resp: any) => {

        console.log(resp.message);
        
        //setea los productos para que se puedan mostrar
        this._product.setProducts(resp.data);
  
      });
    });




  }
}
