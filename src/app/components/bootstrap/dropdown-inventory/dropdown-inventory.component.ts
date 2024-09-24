import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PipesModule } from '../../../shared/pipes.module';

@Component({
  selector: 'app-dropdown-inventory',
  standalone: true,
  imports: [NgbModule, CommonModule, RouterModule, PipesModule],
  templateUrl: './dropdown-inventory.component.html',
  styleUrl: './dropdown-inventory.component.css'
})
export class DropdownInventoryComponent {

  store: any;
  warehouses: any;
  warehouseName: string = "Inventario";
  @Input() product_id: number = 0;
  @Input() warehouse_id: any;
  
  constructor(private _storeWarehouse: StoreService, private _route: ActivatedRoute){

  }
  
  setWarehouseId(warehouse_id: number = 0){
    this.warehouse_id = warehouse_id;
    this.warehouseName = this.setName();
  }

  setName() : string{

    return this.warehouse_id > 0 ? this.store.warehouses.find((warehouse:any) => warehouse.id == this.warehouse_id).name : this.warehouseName;
    // console.log(this.store.warehouses[warehouse_id]);
  }

  ngOnInit(): void {

    this.store = this._storeWarehouse.storeWarehouses();

    this._route.paramMap.subscribe(params => {

      this.warehouse_id = params.get('warehouse_id') != null ? params.get('warehouse_id') : this.warehouse_id;
      // console.log('imprimiendo el warehouse_id desde el button inventory ' + params.get('warehouse_id'));
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
