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


    this.store = this.route.snapshot.paramMap.get((environment.parametroBase)) || "";

    this._storeService.setSlug(this.store);

    // console.log(this.store + '       x');
    
    // this.route.params.subscribe(params => {

    //   const store = params[environment.parametroBase]; //el parametro base es store

    // });


  }
}
