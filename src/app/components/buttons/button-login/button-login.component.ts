import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-button-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-login.component.html',
  styleUrl: './button-login.component.css'
})
export class ButtonLoginComponent{

  store: string = '/'; 
  estaAutenticado: boolean = false;

  constructor(private _store: StoreService, private _auth: AuthService){
    this.store = this._store.getName();
    this.estaAutenticado = this._auth.estaAutenticado();
  }
  

  
}
