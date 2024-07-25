import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
