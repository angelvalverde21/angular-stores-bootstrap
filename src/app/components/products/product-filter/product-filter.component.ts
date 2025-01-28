import { Component } from '@angular/core';
import { FormSearchComponent } from "../../form-search/form-search.component";

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormSearchComponent],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {

}
