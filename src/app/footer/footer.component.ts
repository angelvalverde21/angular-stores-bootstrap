import { Component } from '@angular/core';
import { LogoComponent } from "../components/logo/logo.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
