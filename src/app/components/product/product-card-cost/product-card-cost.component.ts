import { Component, Input } from '@angular/core';
import { CardTotalAmountComponent } from "../../../auth/shared/card-total-amount/card-total-amount.component";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-card-cost',
  standalone: true,
  imports: [CardTotalAmountComponent],
  templateUrl: './product-card-cost.component.html',
  styleUrl: './product-card-cost.component.css'
})
export class ProductCardCostComponent {


  @Input() product: any; 
  @Input() height: number = 175;
  totalPriceCosto: number = 0;
  totalPriceMayor: number = 0;
  totalPriceNormal: number = 0;
  priceCosto: number = 0;
  priceMayor: number = 0;
  priceNormal: number = 0;
  totalQuantityProduct: number = 0; 
  componentName : string = "";
  constructor(){
    if(environment.showNameComponent){
      this.componentName = this.constructor.name;
      }
  }




  ngOnInit(): void {

    if(this.product?.sku.warehouse?.pivot != null){
      this.totalQuantityProduct = this.product.sku.warehouse.pivot?.quantity;
    }else{
      if (this.product?.sku != null) {
        this.totalQuantityProduct = this.product.sku?.quantity;
      } else {
        this.totalQuantityProduct = 0
      }
    }

    // this.totalQuantityProduct = this.product.sku.warehouse.pivot?.quantity;

    this.priceCosto = this.product.prices.find((price:any) => price.quantity == 0).value;
    this.priceNormal = this.product.prices.find((price:any) => price.quantity == 1).value;
    this.priceMayor = this.product.prices.find((price:any) => price.quantity == 3).value;

    this.totalPriceCosto = this.totalQuantityProduct * this.priceCosto;
    this.totalPriceNormal = this.totalQuantityProduct * this.priceNormal;
    this.totalPriceMayor = this.totalQuantityProduct * this.priceMayor;
    

    // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  

}
