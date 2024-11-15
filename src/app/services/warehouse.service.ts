import { Injectable } from '@angular/core';

import { WarehouseOrderService } from './warehouse-order.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private _warehouseOrder: WarehouseOrderService) { }

  getById(warehouse_id: number) {
    return {
      order: {
        // Ahora order es un objeto con el método getAll como propiedad
        getAll: () => this._warehouseOrder.getAll(warehouse_id),
        update: (data:any, order_id: number) => this._warehouseOrder.update(data, order_id),
      },
      
    };
  }

  // update(warehouse_id: number) {
  //   return {
  //     order: {
  //       // Ahora order es un objeto con el método getAll como propiedad
        
  //     },
      
  //   };
  // }

}
