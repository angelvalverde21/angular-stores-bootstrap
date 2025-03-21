import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewEncapsulation  } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../services/cart.service';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../../services/store.service';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputGroupComponent } from "../../../../components/forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../../../../components/buttons/button-save/button-save.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; //Colocar esto arriba en los imports
import { WarehouseService } from '../../../../services/warehouse.service';
import Swal from 'sweetalert2';
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { WarehouseOrderService } from '../../../../services/warehouse-order.service';
import { catchError } from 'rxjs/operators';
import { OrderService } from '../../../../services/order.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    PipesModule, 
    CommonModule, 
    InputGroupComponent, 
    ButtonSaveComponent, 
    ReactiveFormsModule, 
    LoadingCenterComponent,
    NgbAccordionModule
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class OrderSummaryComponent implements OnInit, OnDestroy{

  @Input() warehouse_id: number = 0; 
  @Input() order: any; 
  @Output() eventTotalAmount = new EventEmitter<number>();
  @Output() eventIsPay = new EventEmitter<boolean>();
  
  summary: any;
  orderSubscription! : Subscription;
  loadingOrderSubscription! : Subscription;
  summaryOrderSubscription! : Subscription;
  // items: any[] = [];
  overlay: boolean = false; 
	items = ['First', 'Second', 'Third'];
  modal: any;
  
  formChildrenIsValid: boolean = false;
  
  loading: boolean = false;
  componentName: string = "";

  constructor(
    private _order: OrderService, 
    private _store: StoreService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _warehouseOrder: WarehouseOrderService,
  ){
    if (environment.showNameComponent) {
      this.componentName = this.constructor.name;
    }
  }
  
  // loading = true; // Definir la variable en la clase

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

    this._order.getOrderObservable().subscribe((resp:any) => {

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
    // throw new Error('Method not implemented.');
    if(this.orderSubscription){
      this.orderSubscription.unsubscribe();
    }
    if(this.loadingOrderSubscription){
      this.loadingOrderSubscription.unsubscribe();
    }
  }

}
