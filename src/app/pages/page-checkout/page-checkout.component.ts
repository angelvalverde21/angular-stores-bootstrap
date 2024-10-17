import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CartComponent } from '../../components/cart/cart.component';
import { CheckoutComponent } from '../../components/checkout/checkout.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../../components/summary/summary.component';
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccordionAddressComponent } from '../../components/accordion/accordion-address/accordion-address.component';
import Swal from 'sweetalert2';
import { OrderPublicService } from '../../services/order-public.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-page-checkout',
  standalone: true,
  imports: [
    HeaderComponent,
    StepperComponent,
    CartComponent,
    CheckoutComponent,
    CommonModule,
    SummaryComponent,
    AddressFormComponent,
    ReactiveFormsModule,
    AccordionAddressComponent,
  ],
  templateUrl: './page-checkout.component.html',
  styleUrl: './page-checkout.component.css',
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
  generateOrderSubscription!: Subscription;
  store: string = '';
  user: any;
  saving: boolean = false;
  is_auth: boolean = false;
  formChildrenIsValid: boolean = false;
  data: any = {};

  constructor(
    private _auth: AuthService,
    private _store: StoreService,
    private fb: FormBuilder,
    private _orderPublic: OrderPublicService,
    private _order: OrderService,
    private _cart: CartService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.generateOrderSubscription) {
      this.generateOrderSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.store = this._store.name()!;
    this.is_auth = this._auth.estaAutenticado();

    if (this.is_auth) {
      this.user = this._auth.user();
      if (this.user.addresses.length > 0) {
        this.formValid(true);
      }
    } else {
    }

    window.scrollTo(0, 0);
    // console.log(this.color_id);
    // console.log(this.product_id);

    // console.log('inico');

    this.store = this._store.name()!;

    this.form = this.fb.group({
      address: [],
    });
  }

  form!: FormGroup;

  formValid(value: boolean) {
    this.formChildrenIsValid = value;
  }

  save() {
    this.saving = true;

    Swal.fire({
      title: 'Espere...',
      html: 'Procesando su pedido',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.data.items = this._cart.getItems();

    if (this.is_auth) {

      this.data.district_id = 1;

      console.log(this.data);
      
      this.generateOrderSubscription = this._order
      .generateOrder(this.data)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);

          const arrayResp = resp.data;

          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Su orden ha sido generada',
            confirmButtonText: 'OK',
            // showConfirmButton: false
          });

          this.router.navigate([
            '/',
            this.store,
            'auth',
            'orders',
            arrayResp.order_id,
          ]);

          this.saving = false;
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al generar su pedido',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/', this.store,'checkout']);
            }
          });
          
          console.error('Ha ocurrido un error interno');
          console.error(error);
        },
      });

    } else {

      this.data = this.form.value.address;

      console.log(this.data);

      this.generateOrderSubscription = this._orderPublic
        .generateOrder(this.data)
        .subscribe({
          next: (resp: any) => {
            console.log(resp);

            const arrayResp = resp.data;

            this._auth.setLogin(
              arrayResp.access_token,
              arrayResp.user,
              arrayResp.store
            );

            Swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: 'Su orden ha sido generada',
              confirmButtonText: 'OK',
              // showConfirmButton: false
            });

            this.router.navigate([
              '/',
              this.store,
              'auth',
              'orders',
              arrayResp.order_id,
            ]);

            this.saving = false;
          },
          error: (error: any) => {
            console.error('Ha ocurrido un error interno');
            console.error(error);
          },
        });
    }
  }
}
