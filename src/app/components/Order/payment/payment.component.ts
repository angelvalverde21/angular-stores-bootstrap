import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../../services/payment.service';
import { CommonModule } from '@angular/common';
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { PipesModule } from '../../../shared/pipes.module';
import { DropzonePaymentComponent } from "../../dropzone-payment/dropzone-payment.component";
import { SelectCustomComponent } from "../../select-custom/select-custom.component";
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, LoadingCenterComponent, PipesModule, DropzonePaymentComponent, SelectCustomComponent, InputGroupComponent, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit, OnDestroy{
  payments: any[] = [];
  paymentSubscription! : Subscription;
  deleteSubscription! : Subscription;
  loading: boolean = false;
  overlay: boolean = false;
  gateways: any[] = [];
  @Input() order_id: number = 0;

  constructor(private _payment: PaymentService, private fb: FormBuilder, private _store: StoreService) // private upperFirstPipe: UpperFirstPipe
  {
    this.gateways = this._store.gateways();

    this.form = this.fb.group({
      gateway_id: [2, [Validators.required]], //1 es efectivo, 2 es yape, son los id que estan en la db
      amount: ['', [Validators.required]], //1 es efectivo, 2 es yape, son los id que estan en la db
    });

  }
  //Formularios
  formChildrenIsValid: boolean = false;
  form!: FormGroup;

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(){
    this.loading = true;
    this.paymentSubscription = this._payment.index(this.order_id).subscribe((resp:any) => {
      this.loading = false;
      console.log("payments recibidos");
      
      this.payments = resp.data;
      console.log(this.payments);
      
    });
  }

  ngOnDestroy(): void {
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
  }
  
  /** formualrios */

  is_dropzone_valid:boolean = false;

  dropzoneValid(value: boolean){
    this.is_dropzone_valid = value;
  }
  formValid(value: boolean) {
    this.formChildrenIsValid = value;
  }

  save() {}

  onSubmit(dropzone: DropzonePaymentComponent) {
    if (this.form.valid) {
      // Crear un objeto con los parámetros adicionales del formulario
      const extraParams = {
        gateway_id: this.form.get('gateway_id')?.value,
        amount: this.form.get('amount')?.value
      };

      // Procesar la subida de archivos con Dropzone y agregar los parámetros
      dropzone.processQueue(extraParams);
    }
  }

  addPayment($event: any){
    this.payments.unshift($event);
  }

  eliminar(payment_id: number){

    console.log(payment_id);
    this.overlay = true;
    // this.loading = true;
    this.deleteSubscription = this._payment.destroy(payment_id).subscribe((resp:any) => {
      // this.loading = false;
      // console.log("payments recibidos");
      console.log("item borrado");
      this.overlay = false;
      this.payments =  this.payments.filter((payment:any) => payment.id !== payment_id);
      
    });

  }
}