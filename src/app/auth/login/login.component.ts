import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  slugBase: string = "";


  constructor(
    private route: ActivatedRoute,
    private _store: StoreService,
  ) {

    this.route.parent?.params.subscribe((params) => {

      const slugBase = params[environment.parametroBase]; //el parametro base es store
      console.log('valor inicial ' + slugBase);

      //usamos un suscribe porque para determinar que es slugBase es correcto, tomara un poco de tiempo
      this._store.slugBase(slugBase).subscribe((resp: any) => {

        console.log('el valor que viene de ******** setSlugBase ');
        console.log(resp);

        this._store.setName(resp.name); //setea la url de la pagina web (StoreName)

      });
      
    });
    // this._storeService.setSlugBase('ara').subscribe((resp: any) => {
    //   console.log('ingresamos correctamente al LoginCompoent.ts');
    // });

    // console.log(this.store + '       x');
    
    // this.route.params.subscribe(params => {

    //   const store = params[environment.parametroBase]; //el parametro base es store

    // });


  }
}
