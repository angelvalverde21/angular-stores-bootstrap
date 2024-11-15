import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardTotalAmountComponent } from "../../../auth/shared/card-total-amount/card-total-amount.component";

@Component({
  selector: 'app-report-inventory',
  standalone: true,
  imports: [CardTotalAmountComponent],
  templateUrl: './report-inventory.component.html',
  styleUrl: './report-inventory.component.css'
})
export class ReportInventoryComponent implements OnInit, OnDestroy{


  @Input() product: any; 
  totalPriceCosto: number = 0;
  totalPriceMayor: number = 0;
  totalPriceNormal: number = 0;
  priceCosto: number = 0;
  priceMayor: number = 0;
  priceNormal: number = 0;
  totalQuantityProduct: number = 0; 

  constructor(){
    

  }


  ngOnInit(): void {

    this.totalQuantityProduct = this.product.sku.warehouse.pivot?.quantity;

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
