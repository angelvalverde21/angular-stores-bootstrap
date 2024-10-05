import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../../../shared/pipes.module';
import { ProductPriceCreateComponent } from "../product-price-create/product-price-create.component";
import Swal from 'sweetalert2';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-product-prices',
  standalone: true,
  imports: [CommonModule, PipesModule, ProductPriceCreateComponent],
  templateUrl: './product-prices.component.html',
  styleUrl: './product-prices.component.css'
})
export class ProductPricesComponent {

  @Input() product_id: number = 0; 
  @Input() prices: any[] = []; 

  constructor(private _product: ProductService){

  }

  updatePrice(event:any){
    console.log(event);
    this.prices.unshift(event); 
  }

  confirmDelete(price_id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(price_id);
      }
    });
  }

  deleteItem(price_id: number){

    // this._product.deletePrice(this.product_id, price_id).subscribe((resp:any) => {
    //   console.log(resp);
      
    //   Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
    // });
    this._product.deletePrice(this.product_id, price_id).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.prices = this.prices.filter(price => price.id !== price_id);
        Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
      },
      error: (error:any) => {
        console.log(error);
      }
    });
    
  }

}
