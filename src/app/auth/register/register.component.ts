import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
