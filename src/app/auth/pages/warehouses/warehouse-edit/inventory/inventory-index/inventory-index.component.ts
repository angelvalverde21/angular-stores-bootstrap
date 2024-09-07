import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColorSizeComponent } from '../../../../../shared/color-size/color-size.component';
import { ProductService } from '../../../../../../services/product.service';

@Component({
  selector: 'app-inventory-index',
  standalone: true,
  imports: [CommonModule, ColorSizeComponent],
  templateUrl: './inventory-index.component.html',
  styleUrl: './inventory-index.component.css'
})
export class InventoryIndexComponent {
  
  private InventorySubscription!: Subscription; 

  products: any;
  warehouse_id: any;

  constructor(
    private _products: ProductService, 
    private _route: ActivatedRoute){

  }

  ngOnInit(): void {
  
    // Escuchar los parámetros del nivel actual de la ruta
    this._route.parent?.paramMap.subscribe(params => {
      console.log('Parámetros en el primer hijo de la ruta actual:', params.keys); // Aquí debería obtener los parámetros de las rutas hijas
      this.warehouse_id = params.get('warehouse_id');
      console.log(this.warehouse_id);
      this.InventorySubscription = this._products.all().subscribe((resp: any) => {
        this.products = resp.data;
      });
    });



  }

  
}
