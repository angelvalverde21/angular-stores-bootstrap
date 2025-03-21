import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-logout.component.html',
  styleUrl: './button-logout.component.css'
})
export class ButtonLogoutComponent {
  store: string = ''; 
  
  constructor(private _store: StoreService, private _auth: AuthService){
    this.store = this._store.getName();
  }
  
  logout(){
    this._auth.logout();
  }
}
