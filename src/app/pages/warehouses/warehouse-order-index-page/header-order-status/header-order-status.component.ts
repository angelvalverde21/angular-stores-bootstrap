import { Component, Input, OnInit } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-order-status',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './header-order-status.component.html',
  styleUrl: './header-order-status.component.css',
})
export class HeaderOrderStatusComponent implements OnInit{
  @Input() order: any;
  message: string = '';
  icon: string = '';

  constructor() {

  }
  ngOnInit(): void {

    if (this.order.is_delivery) {
      this.message = 'Entregado';
      this.icon = "bs-stepper-circle";

    } else {

      if (this.order.is_shipment) {
        this.message = 'Enviado';
        this.icon = "fas fa-shipping-fast";
        
      } else {

        if (this.order.is_package) {
          this.message = 'Listo para Envio';
          this.icon = "fas fa-box-open";

        } else {

          if (this.order.is_pay) {
            this.message = 'Pagado';
            this.icon = "fas fa-dollar-sign";

          } else {
            this.message = "Pedido el ";
            this.icon = "";

          }
        }
      }
    }
  }

}
