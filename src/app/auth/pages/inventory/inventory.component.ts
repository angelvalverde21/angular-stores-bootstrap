import { Component } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

}
