import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from "../Order/payment/payment.component";
import { OrderPhotoComponent } from "../Order/order-photo/order-photo.component";
import { catchError, Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { WarehouseOrderService } from '../../services/warehouse-order.service';


@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, PaymentComponent, OrderPhotoComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent implements OnInit, OnDestroy{

  modal: any;

  @Input() order: any; 
  @Input() warehouse_id: number = 0; 
  loading: boolean = false;
  loadingOrderSubscription!: Subscription;
  orderSubscription!: Subscription;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _order: OrderService,
    private _warehouseOrder: WarehouseOrderService
  ) {
  // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openUploadVoucher(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }

  openUploadPaymentCourier(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }

  openUplodPackage(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }

  openModal(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }



  ngOnInit(): void {
    
    // this.loading = true; // Activar la carga antes de suscribirse
  
    // this.summaryOrderSubscription = this._order.getSummaryObservable().subscribe({
    //   next: (resp: any) => {
    //     this.orderload(); // Ejecuta la lógica necesaria
    //   },
    //   error: (error) => {
    //     console.error('Error en la suscripción:', error);
    //   }
    // });
  
    this.loadingOrderSubscription = this._order.getLoadingOrderObservable().subscribe((resp:boolean) => {
      this.loading = resp;
    });

    this.orderSubscription = this._order.getOrderObservable().subscribe((resp:any) => {
      this.order = resp.data;

      console.log("log desde summary");
      console.log(this.order);
      
      this.loading = false;
    });


  }

  orderload(){

    if (!this.order?.id) return; // Previene llamadas innecesarias si order.id es undefined

    this.loading = true;

    this.orderSubscription = this._warehouseOrder
      .getById(this.warehouse_id, this.order.id)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar la orden', error);
          this.loading = false;
          return []; // Retorna un array vacío para evitar que la app se rompa
        })
      )
      .subscribe((resp: any) => {
        this.order = resp.data;
        this.loading = false;
      });

  }

  ngOnDestroy(): void {
    if(this.orderSubscription){
      this.orderSubscription.unsubscribe();
    }
    
  }

  closeModal(){
    this.modal.close();
  }
  

}