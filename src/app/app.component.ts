import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CartComponent } from "./cart/cart.component";
import { StoreService } from './services/store.service';

declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {

  constructor(private route: ActivatedRoute, private _store: StoreService) {
    // console.log('AppComponent initialized');
  }

  title = 'stores';

  openModal() {
    console.log('click en boton');
    
    $('#exampleModal').modal('show');

  }

}
