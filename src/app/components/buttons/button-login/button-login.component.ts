import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-button-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-login.component.html',
  styleUrl: './button-login.component.css'
})
export class ButtonLoginComponent{

  store: string = '/'; 
  
  constructor(private _storeService: StoreService){
    // console.log(this.store + 'desde btn login');
    this.store = this._storeService.getSlug();
  }
  

  
}
