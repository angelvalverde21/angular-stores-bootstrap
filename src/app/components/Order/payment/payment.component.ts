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
import Swal from 'sweetalert2';
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
  @Input() type: number = 1; // 1 es para registrar el pago del cliente, 3 es para registrar el pago que se le hace al courier

  constructor(private _payment: PaymentService, private fb: FormBuilder, private _store: StoreService) // private upperFirstPipe: UpperFirstPipe
  {
    this.gateways = this._store.gateways();

    this.form = this.fb.group({
      type: [this.type, [Validators.required]], //1 es efectivo, 2 es yape, son los id que estan en la db
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
    this.paymentSubscription = this._payment.index(this.order_id, this.type).subscribe((resp:any) => {
      this.payments = resp.data;
      this.loading = false;
      console.log("payments recibidos");
      console.log(this.payments);
      console.log(resp);
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

  swal: any;

  save() {}

  onSubmit(dropzone: DropzonePaymentComponent) {

    this.swal = Swal.fire({
      title: 'Espere...',
      html: 'Estamos cargando el comprobante',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (this.form.valid) {
          // Crear un objeto con los parámetros adicionales del formulario
          const extraParams = {
            type: this.type,
            gateway_id: this.form.get('gateway_id')?.value,
            amount: this.form.get('amount')?.value
          };
    
          // Procesar la subida de archivos con Dropzone y agregar los parámetros
          dropzone.processQueue(extraParams);
        }
      }
    })

  }

  addPayment($event: any){
    this.payments.unshift($event);
  }

  eliminar(payment_id: number){

    console.log(payment_id);
    this.overlay = true;
    // this.loading = true;
    this.deleteSubscription = this._payment.destroy(payment_id, this.order_id).subscribe((resp:any) => {
      // this.loading = false;
      // console.log("payments recibidos");
      console.log("item borrado");
      this.overlay = false;
      this.payments =  this.payments.filter((payment:any) => payment.id !== payment_id);
      
    });

  }

  formError(){

  }

  formStatus(event: boolean){

    if (event) {
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Subio correctamente',
        confirmButtonText: 'OK',
        showConfirmButton: true
      })

      // this.form.valid = false;
      this.is_dropzone_valid = false;
      this.form.get('amount')?.setValue(0);

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al cargar el archivo',
      });
      
    }

  }
}