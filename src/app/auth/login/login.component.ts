import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  store: string = "";

  constructor(
    private _storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute, 
  ) {


    this._storeService.setSlugBase('ara').subscribe((resp: any) => {
      console.log('ingresamos correctamente al LoginCompoent.ts');
    });

    // console.log(this.store + '       x');
    
    // this.route.params.subscribe(params => {

    //   const store = params[environment.parametroBase]; //el parametro base es store

    // });


  }
}
