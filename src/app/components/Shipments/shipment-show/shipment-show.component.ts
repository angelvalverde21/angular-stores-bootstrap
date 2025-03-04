import { Component, Input, OnInit } from '@angular/core';
import { AddressDefaultComponent } from '../../address/address-default/address-default.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ShipmentService } from '../../../services/shipment.service';
import { LoadingCenterComponent } from '../../loading-center/loading-center.component';
import { InputGroupComponent } from '../../forms/input-group/input-group.component';
import { ButtonSaveComponent } from '../../buttons/button-save/button-save.component';
import { CommonModule } from '@angular/common';
import { ButtonSwitchComponent } from "../../buttons/button-switch/button-switch.component";
import { CourierDefaultComponent } from "../../courier/courier-default/courier-default.component";
import { SelectCustomComponent } from "../../select-custom/select-custom.component";
import { ButtonEnvioEsComponent } from "../../buttons/button-envio-es/button-envio-es.component";

@Component({
  selector: 'app-shipment-show',
  standalone: true,
  imports: [
    AddressDefaultComponent,
    LoadingCenterComponent,
    InputGroupComponent,
    ButtonSaveComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonSwitchComponent,
    CourierDefaultComponent,
    SelectCustomComponent,
    ButtonEnvioEsComponent
],
  templateUrl: './shipment-show.component.html',
  styleUrl: './shipment-show.component.css',
})
export class ShipmentShowComponent implements OnInit {
  constructor(private fb: FormBuilder, private _shipment: ShipmentService) {}

  ngOnInit(): void {
    this.shipment_id = this.shipment.id;

    this.formInit();
    this.formLoad();
  }

  @Input() user_id: number | null = null;
  @Input() address: any;
  shipment_id: number = 0;
  @Input() shipment: any;

  form!: FormGroup;
  loading: boolean = false;
  success: boolean = false;

  methods: any[] = [];
  payment_types: any[] = [];
  
  private formInit(): void {

    this.methods = [
      {
        "id": 1,
        "name": "Estandar",
        "icon": "fas fa-truck"
      },
      {
        "id": 2,
        "name": "Express",
        "icon": "fas fa-motorcycle"
      },
      {
        "id": 3,
        "name": "Aereo",
        "icon": "fas fa-plane"
      },
    ]

    this.payment_types = [
      {
        "id": 1,
        "name": "ENVIO GRATIS",
        "icon": "fa-solid fa-credit-card"
      },

      {
        "id": 3,
        "name": "ENVIO PAGADO",
        "icon": "fa-solid fa-money-bill-wave"
      },
    ]

    if (this.shipment.courier_address.courier.acepta_pago_destino) {
      this.payment_types.push(
        {
          "id": 2,
          "name": "PAGO DESTINO",
          "icon": "fas fa-motorcycle"
        },
      )
    }


    this.form = this.fb.group({
      cost_client: ['', [Validators.required]],
      cost_courier: [''],
      date: ['', [Validators.required]],
      cash_on_delivery: ['', [Validators.required]],
      method: ['', [Validators.required]],
      payment_type: ['', [Validators.required]],
      // over_sale: [''],
      // sell_size_unique: [''],
      // colors: this.fb.array([]),
    });
  }


  selectedAddress(address: any) {
    this._shipment.updateAddressId(address, this.shipment.id).subscribe({
      next: (resp: any) => {
        Swal.fire(
          'Guardado',
          'El registro ha actualizado correctamente',
          'success'
        );
        this.success = true;
      },
      error: (error: any) => {
        Swal.fire(
          'Error',
          'Ocurrió un problema al cambiar la direccion. Inténtalo nuevamente.',
          'error'
        );

        console.error(error);
      },
    });
  }

  selectedCourierAddress(address:any){

    console.log("mostrando informacion en el warehouseOrderPage");
    console.log(address);
    const data = {
      "courier_address_id": address.id
    }
    // this._warehouseOrder.update(data, this.order_id).subscribe((resp:any) => {
    //   console.log(resp.data);
      
    // });

  }

  private formLoad() {
    //y este carga los datos del @Input

    // this.loading = true;

    this.form.patchValue(this.shipment);
  }

  // private formLoad() { //Este formload consulta a la api

  //   this.loading = true;

  //   if (this.shipment_id) {

  //     this._shipment.show(this.shipment_id).subscribe({

  //       next: (resp: any) => {
  //         // console.log(resp);
  //         this.form.patchValue(resp.data);
  //       },

  //       error: (error: any) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'No se encontró el producto',
  //         })
  //       },
  //     });
  //   }
  // }

  create() {
    // console.log('form enviado');
    this.success = false;

    this._shipment.create(this.form.value).subscribe({
      next: (resp: any) => {
        Swal.fire('Guardado', 'El registro ha sido creado', 'success');
        this.success = true;
      },
      error: (error: any) => {
        Swal.fire(
          'Error',
          'Ocurrió un problema al crear. Inténtalo nuevamente.',
          'error'
        );

        console.error(error);
      },
    });
  }

  update() {
    console.log('form enviado');
    this.success = false;

    this._shipment.update(this.form.value, this.shipment_id).subscribe({
      next: (resp: any) => {
        Swal.fire('Guardado', 'El registro ha sido actualizado', 'success');
        this.success = true;
      },
      error: (error: any) => {
        Swal.fire(
          'Error',
          'Ocurrió un problema al actualizar. Inténtalo nuevamente.',
          'error'
        );

        console.error(error);
      },
    });
  }
}

