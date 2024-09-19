import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown-auth-home',
  standalone: true,
  imports: [RouterModule, NgbModule],
  templateUrl: './dropdown-auth-home.component.html',
  styleUrl: './dropdown-auth-home.component.css'
})
export class DropdownAuthHomeComponent {

  @Input() store : string = ""; 
  

}
