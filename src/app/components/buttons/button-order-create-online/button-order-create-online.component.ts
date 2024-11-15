import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseOrderCreateOnlineComponent } from "../../warehouses/warehouse-order-create-online/warehouse-order-create-online.component";

@Component({
  selector: 'app-button-order-create-online',
  standalone: true,
  imports: [CommonModule, WarehouseOrderCreateOnlineComponent],
  templateUrl: './button-order-create-online.component.html',
  styleUrl: './button-order-create-online.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonOrderCreateOnlineComponent{

  modal: any;
  warehouseName: string = '';
  warehouse_id: number = 0;
  text: string = "";
  
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true, size: 'lg' });
  }


  receiveOrderId(order_id: number){
    console.log("se recibio el id " + order_id);
    
    this.modal.close();
  }

}

