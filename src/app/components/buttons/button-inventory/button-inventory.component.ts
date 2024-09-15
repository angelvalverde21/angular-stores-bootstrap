import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { PipesModule } from '../../../shared/pipes.module';

@Component({
  selector: 'app-button-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, PipesModule],
  templateUrl: './button-inventory.component.html',
  styleUrl: './button-inventory.component.css'
})
export class ButtonInventoryComponent implements OnInit, AfterViewInit{
  
  store: any;
  warehouses: any;
  warehouseName: string = "Almacenes";
  @Input() product_id: number = 0;
  @Input() warehouse_id: any;
  
  constructor(private _storeWarehouse: StoreService, private _route: ActivatedRoute){

  }

  setWarehouseId(warehouse_id: number = 0){
    this.warehouse_id = warehouse_id;
    this.warehouseName = this.setName();
  }

  setName() : string{

    return this.warehouse_id > 0 ? this.store.warehouses.find((warehouse:any) => warehouse.id == this.warehouse_id).name : "Almacenes";
    // console.log(this.store.warehouses[warehouse_id]);
  }

  ngOnInit(): void {

    this.store = this._storeWarehouse.storeWarehouses();

    this._route.paramMap.subscribe(params => {

      this.warehouse_id = params.get('warehouse_id');
      console.log('imprimiendo el warehouse_id desde el button inventory ' + params.get('warehouse_id'));
      console.log(this.warehouse_id);
      
      this.warehouseName = this.setName();

    });

    // this.warehouses = this.store.warehouses
    console.log(this.warehouse_id);
    
    // this.setName();
  }
  
  ngAfterViewInit(): void {
    
  }
}
