import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../../../header/header.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent{

}
