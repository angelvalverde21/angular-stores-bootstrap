import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CartComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stores';

  openModal() {
    console.log('click en boton');
    
    $('#exampleModal').modal('show');

  }

  

}
