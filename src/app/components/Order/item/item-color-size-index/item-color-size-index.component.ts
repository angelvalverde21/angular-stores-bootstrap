import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingCenterComponent } from "../../../loading-center/loading-center.component";
import { CommonModule } from '@angular/common';
import { WarehouseProductColorService } from '../../../../services/warehouse-product-color.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-color-size-index',
  standalone: true,
  imports: [LoadingCenterComponent, CommonModule],
  templateUrl: './item-color-size-index.component.html',
  styleUrl: './item-color-size-index.component.css'
})
export class ItemColorSizeIndexComponent implements OnInit, OnDestroy{

  @Input() product_id: number = 0; 
  warehouse_id: number = 0; 
  colors: any[] = [];
  colorIndexSubscription!: Subscription;
  loading: boolean = false;

  constructor(private _warehouseProductColor: WarehouseProductColorService, private route: ActivatedRoute){

  }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((param:any) => {
      
      this.warehouse_id = param['warehouse_id'];
      
      this.load();

    });

  }

  load(){

    this.loading = true;

    this.colorIndexSubscription = this._warehouseProductColor.getAll(this.warehouse_id, this.product_id).subscribe((resp:any) => {

      this.loading = false;
      // this.colors = resp.data.colors
      this.colors = resp.data.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
      console.log(resp);
      
    });
  }

  ngOnDestroy(): void {

  }

}
