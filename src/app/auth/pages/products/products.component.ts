import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent{

}
