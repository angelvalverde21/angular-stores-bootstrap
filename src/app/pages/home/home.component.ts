import { Component } from '@angular/core';
import { StepperComponent } from "../../components/stepper/stepper.component";
import { CardPlaceHolderComponent } from "../../components/card-place-holder/card-place-holder.component";
import { HeaderComponent } from "../../header/header.component";
import { CardProductComponent } from "../../components/card-product/card-product.component";
import { FooterComponent } from "../../footer/footer.component";
import { ProductsComponent } from "../../components/products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
