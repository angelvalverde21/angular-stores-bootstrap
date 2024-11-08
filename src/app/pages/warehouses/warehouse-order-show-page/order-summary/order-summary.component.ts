import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation  } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../services/cart.service';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../../services/store.service';
import { ButtonDotsVerticalComponent } from "../../../../components/button-dots-vertical/button-dots-vertical.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputGroupComponent } from "../../../../components/forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../../../../components/buttons/button-save/button-save.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; //Colocar esto arriba en los imports
import { WarehouseService } from '../../../../services/warehouse.service';
import Swal from 'sweetalert2';
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [PipesModule, CommonModule, ButtonDotsVerticalComponent, InputGroupComponent, ButtonSaveComponent, ReactiveFormsModule, LoadingCenterComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class OrderSummaryComponent implements OnInit, OnDestroy{

  @Input() order_id: number = 0; 
  @Input() warehouse_id: number = 0; 
  @Input() is_pay: boolean = false; 
  @Input() btnLoading: boolean = false; 
  @Input() btnActive: boolean = true; 
  @Input() order: any; 
  summary: any;
  summarySubscription! : Subscription;
  costosSubscription! : Subscription;
  items: any[] = [];
  overlay: boolean = false; 

  modal: any;

  formChildrenIsValid: boolean = false;

  constructor(
    private _cart: CartService, 
    private _store: StoreService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _warehouse: WarehouseService
  ){

  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }
  /**** ojo este el summary para una order ya generada, no es el mismo que el que esta en un cart */

  ngOnInit(): void {

    this.initForm();

    this.calcularCostos();

    this.summarySubscription =  this._cart.getSummaryObservable().subscribe((resp:any) => {
      this.calcularCostos();
    });

  }
  
  calcularCostos(){

    this.overlay = true;

    this.costosSubscription = this._store.getOrderById(this.order_id).subscribe((resp:any) => {

      this.order = resp.data;

      this.items = resp.data.items;

      console.log('calcularCostos');
      
      console.log(this.items);
    

      console.log("costos pero de una orden");
      //El método reduce() es una función de los arrays en JavaScript que se utiliza para reducir un array a un único valor
      //array.reduce((accumulator, currentValue, index, array) => {
        // lógica de reducción
      //}, initialValue);
      const shipping_cost = this.order.shipping_cost != null ? this.order.shipping_cost : 0;
      const sub_total =  this.items.reduce((sum:number, item:any) => sum + parseFloat(item.price), 0); //sum:number es el acumulador
      const total =  this.items.reduce((sum:number, item:any) => sum + parseFloat(item.content.price), 0) + parseFloat(shipping_cost);
      const descuentos = sub_total - total;
      this.summary = {
        "sub_total": sub_total,
        "total_amount": total,
        "descuentos": descuentos
      }

      console.log(this.summary);
      this.overlay = false;

    });



  }

  ngOnDestroy(): void {
    if (this.summarySubscription) {
      this.summarySubscription.unsubscribe();
    }
    if (this.costosSubscription) {
      this.costosSubscription.unsubscribe();
    }
  }


  /*** form  ***/
  
  form!: FormGroup;
  
  formValid(value: boolean) {
    this.formChildrenIsValid = value;
  }
  
  save(){

    this.btnLoading = true;
    this.btnActive = false;


    Swal.fire({
      title: 'Espere...',
      html: 'Guardando',
      allowOutsideClick: false,
      didOpen: () => {

        Swal.showLoading();

        console.log(this.form.value);
        this._warehouse.getById(this.warehouse_id).order.update(this.form.value, this.order_id).subscribe((resp:any) => {

          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'La operacion ha sido ejecutada correctamente',
            confirmButtonText: 'OK',
            showConfirmButton: true
          })

          this.modal.close();
          
          console.log(resp);
          this.order = resp.data;
          this.btnLoading = !this.btnLoading;
          this.btnActive = !this.btnActive;

          this._cart.setSummary();

        });

      }
    })
    



  }

  private initForm(): void {
    this.form = this.fb.group({
      envio_es: [this.order.envio_es, [Validators.required]],
      shipping_cost: [this.order.shipping_cost],
    });
  }
  
  envio: any;

  envio_es(value: string) {

    switch (value) {
      case '1':
        return "GRATIS";
        break;
        case '2':
          return "COBRADO AL CLIENTE";
        break;
      case '3':
        return "PAGO EN DESTINO";
        break;
    
      default:
        return "NO APLICA " + value;
        break;
    }

  }

}
