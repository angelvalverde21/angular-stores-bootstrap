import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingCenterComponent } from "../../../loading-center/loading-center.component";
import { CommonModule } from '@angular/common';
import { WarehouseProductColorService } from '../../../../services/warehouse-product-color.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-color-size-index',
  standalone: true,
  imports: [LoadingCenterComponent, CommonModule],
  templateUrl: './item-color-size-index.component.html',
  styleUrl: './item-color-size-index.component.css'
})
export class ItemColorSizeIndexComponent implements OnInit, OnDestroy{

  @Input() product: any; 
  warehouse_id: number = 0; 
  colors: any;
  colorIndexSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private _warehouseProductColor: WarehouseProductColorService, 
    private route: ActivatedRoute,
    private _cart: CartService
  
  ){
    console.log(this.product);
    
  }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((param:any) => {
      
      this.warehouse_id = param['warehouse_id'];
      
      this.load();

    });

  }

  load(){

    console.log(this.product);
    

    this.loading = true;

    this.colorIndexSubscription = this._warehouseProductColor.getAll(this.warehouse_id, this.product.id).subscribe((resp:any) => {

      this.loading = false;
      // this.colors = resp.data.colors
      this.colors = resp.data.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
      console.log(resp);
      
    });
  }

  addCart(color: any, size: any , value: any){

    const price = this.product.prices.find((price:any) => price.quantity == 1 );

    console.log(color);
    console.log(value);
    
    const item =     {

      "color_id": color.id,
      "type": "color_size_id",
      'size': size,
      'size_id': size.id,
      "quantity": 1,
      "image": color.image.url_medium,
      "product_id": this.product.id,
      "prices": this.product.prices,
      "name": this.product.name,
      "price": price.value,
      "subtotal": price.value
      
    }
    
    this._cart.addItemCartWarehouse(item);

    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: 'El item ha sido agregado',
      confirmButtonText: 'OK',
      showConfirmButton: true
    })
    
    this._cart.setSummary();

  }

  ngOnDestroy(): void {

  }

  resetColors(){
    this.colors = null;
  }

}
