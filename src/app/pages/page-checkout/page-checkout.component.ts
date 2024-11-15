import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CartComponent } from '../../components/cart/cart.component';
import { CheckoutComponent } from '../../components/checkout/checkout.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from '../../components/summary/summary.component';
import { AddressFormComponent } from '../../components/address/address-form/address-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrderPublicService } from '../../services/order-public.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AddressIndexComponent } from "../../components/address/address-index/address-index.component";

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
    AddressIndexComponent
],
  templateUrl: './page-checkout.component.html',
  styleUrl: './page-checkout.component.css',
})
export class PageCheckoutComponent implements OnInit, OnDestroy, AfterViewInit {
  generateOrderSubscription!: Subscription;
  store: string = '';
  user: any;
  saving: boolean = false;
  is_auth: boolean = false;
  formChildrenIsValid: boolean = false;
  data: any = {};
  address_id: number | null = null;
  isButtonValid: boolean = false;
  isFormValid: boolean = false;

  constructor(
    private _auth: AuthService,
    private _store: StoreService,
    private fb: FormBuilder,
    private _orderPublic: OrderPublicService,
    private _order: OrderService,
    private _cart: CartService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    if (this.generateOrderSubscription) {
      this.generateOrderSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    //recupero los items

    // this.items = this._cart.getItems();
    this.store = this._store.name()!;
    this.is_auth = this._auth.estaAutenticado();

    if (this.is_auth) {
      this.user = this._auth.user();
      // this.formValid();
    } else {
      //sino esta autenticado no es necesario usar el formGroup
      this.saving = false;
      this.form = this.fb.group({
        address: [],
      });

    }

    window.scrollTo(0, 0);

    //siempre debemos comprobar que hay algo en el carrito

    this._cart.getItemsObservable().subscribe((resp:any) => {
      console.log("se modifico el carrito de compras");
      
      this.checkIsButtonValid();
    });

  }

  form!: FormGroup;

  /******************** RECEPTORES DESDE OTROS COMPONENTES QUE EMITEN *************************/

  //Recibo desde el listado de direcciones UNA SOLA DIRECCION desde <app-address-index> esta funcion se usa cuando el usuario esta logueado
  authAddressIndex(address: any | null){

    if (address != null) {
      console.log(address);
      this.address_id = address.id;
      this.checkIsButtonValid();
    }

  }

  //Recibo el status del formulario (<app-address-form>), esta funciona se usara cuando no este logueado en angular 
  formValid(value: boolean){
    this.isFormValid = value;
    this.checkIsButtonValid();
  }

  /******************** RECEPTORES DESDE OTROS COMPONENTES QUE EMITEN *************************/

  selectAddressId(value: number){
    this.address_id = value;
  }

  checkIsButtonValid(){

    this.isButtonValid = false;

    // console.log(this.items.length);
    if (this._cart.getItems().length > 0) {
      if(this.is_auth){
        // console.log(this.address_id);
        
        if(this.address_id != null){
          this.isButtonValid = true;
        }
      }else{
        if(this.isFormValid){
          this.isButtonValid = true;
        }
      }
    }

    // console.log(this.isButtonValid);
    
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

    this.data.address_id = this.address_id;
    console.log(this.data);
    
    if (this.is_auth) {


      console.log(this.data);
      
      this.generateOrderSubscription = this._order
      .generateOrder(this.data)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);

          const arrayResp = resp.data;

          this.router.navigate([
            '/',
            this.store,
            'auth',
            'orders',
            arrayResp.order_id,
          ]);

          this.saving = false;
          
          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Su orden ha sido generada',
            confirmButtonText: 'OK',
            // showConfirmButton: false
          });


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
