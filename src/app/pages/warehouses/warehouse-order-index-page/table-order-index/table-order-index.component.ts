import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../../../shared/pipes.module';
import { OrderService } from '../../../../services/order.service';
import { StoreService } from '../../../../services/store.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from '../../../../components/Order/payment/payment.component';

@Component({
  selector: 'app-table-order-index',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    PipesModule,
    RouterModule,
    NgbDropdownModule,
    PaymentComponent,
  ],
  templateUrl: './table-order-index.component.html',
  styleUrl: './table-order-index.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TableOrderIndexComponent {
  @Input() orders: any;
  @Input() store: string = '';
  @Input() warehouse_id: number = 0;
  selectedOrderId: number = 0;
  constructor(
    private _order: OrderService,
    private _store: StoreService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  status(order: any) {
    return this._order.status(order);
  }

  warehouseName() {
    const warehouses = this._store.warehouses();
    return warehouses.find(
      (warehouse: any) => warehouse.id == this.warehouse_id
    ).name;
  }

  modal: any;

  // uploadComprobanteEnvio(content: TemplateRef<any>) {
  //   this.modal = this.modalService.open(content, { centered: true });
  // }

  openModal(content: TemplateRef<any>, orderId: number): void {
    this.selectedOrderId = orderId;
    this.modal = this.modalService.open(content, { centered: true });
  }


}
