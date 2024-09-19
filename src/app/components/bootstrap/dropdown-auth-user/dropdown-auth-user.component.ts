import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PipesModule } from '../../../shared/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown-auth-user',
  standalone: true,
  imports: [RouterModule, PipesModule, NgbModule],
  templateUrl: './dropdown-auth-user.component.html',
  styleUrl: './dropdown-auth-user.component.css'
})
export class DropdownAuthUserComponent {

  @Input() store : string = ""; 
  @Input() name : string = "User"; 

  constructor(private _auth: AuthService){

  }
  
  logout(){
    this._auth.logout(this.store);
  }


}
