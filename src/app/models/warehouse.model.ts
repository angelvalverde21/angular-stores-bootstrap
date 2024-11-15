// models/warehouse.model.ts
import { Order } from "./order.model";
import { HttpClient } from '@angular/common/http';

export class Warehouse {
  constructor(private warehouse_id: number, private http: HttpClient) {}

  // Devuelve una instancia de la clase Order
  get order(): Order {
    return new Order(this.warehouse_id, this.http);
  }
}