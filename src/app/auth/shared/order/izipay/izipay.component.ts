import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject, TemplateRef, ViewEncapsulation
} from '@angular/core';
import KRGlue from '@lyracom/embedded-form-glue';
import { environment } from '../../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from "../../../../components/loading/loading.component";
import Swal from 'sweetalert2';

interface postData {
  amount: string;
  currency: string;
  orderId: number;
  customer: {
    reference: string;
    email: string;
    billingDetails: {
      firstName: string;
      lastName: string;
    };
  };
}

@Component({
  selector: 'app-izipay',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './izipay.component.html',
  styleUrl: './izipay.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class IzipayComponent implements OnInit, OnDestroy {

  @Input() order: any;

  postData!: postData;

  encontrado: boolean = false;
  messageRegisterPayment: boolean = false;
  loading: boolean = true;

  orderPagado: boolean = false;
  is_partner: boolean = false;
  showAlertAprobado: boolean = false;
  showAlertRechazado: boolean = false;

  store: any;

  messageFormModal: any;
  message: string = '';
  nameComplete: string = '';
  total_amount: string = '';

  showFormIzipay: boolean = false;

  constructor(
    private _order: OrderService,
    private ruta: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private _auth: AuthService,
    private chRef: ChangeDetectorRef,
    config: NgbModalConfig,
		private modalService: NgbModal,
  ) {

    // customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
  }

  private modalRef: NgbModalRef | null = null;

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalRef = this.modalService.open(content, { centered: true });
    
    // Suscripción para detectar cuando se cierra el modal
    this.modalRef.result.then(
      (result) => {
        console.log(`Modal cerrado con: ${result}`);
        // Aquí puedes agregar la lógica para cuando el modal se cierra normalmente
      },
      (reason) => {
        console.log("modal cerrado");
        this.showFormIzipay = false;
        // console.log(`Modal cerrado por: ${this.getDismissReason(reason)}`);
        // Aquí puedes manejar cuando el modal se cancela (dismiss)
      }
    );

    this.loadFormPay(this.postData);
	}

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close('Cierre');  // Cierra el modal normalmente
    }
  }

  ngOnInit(): void {
    // Agregar el archivo CSS al head
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href =
      'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon-reset.css';
    document.head.appendChild(linkElement);

    // Agregar el script al body
    const scriptElement = document.createElement('script');
    scriptElement.src =
      'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js';
    document.body.appendChild(scriptElement);

    // throw new Error('Method not implemented.');
    // this.loadFormPay(this.postData);

    //seteando la variable postData que enviaremos al servidor para pedir nuestro token

    this.nameComplete = this.order.address.name.split(' ');
    this.total_amount = this.order.total_amount.split('.');

    this.postData = {
      amount: this.total_amount[0] + this.total_amount[1],
      currency: 'PEN',
      orderId: this.order.id,
      customer: {
        reference: '456',
        email: 'vanesahg@gmail.com',
        billingDetails: {
          firstName: this.nameComplete[0],
          lastName: this.nameComplete[1],
        },
      },
    };

    
    if (!this.order.is_pay) {
      console.log('orden no esta pagado');
    } else {
      console.log('orden esta pagado');
    }

    // this._console.log('cargo el this.postData');

    // this._console.log(this.postData);

    this.loading = false;
    // this._console.log('se ha recibido correctamente los datos de la orden');
    // this._console.log(data);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    // Eliminar el archivo CSS cuando se destruye el componente
    const linkElement = document.querySelector(
      `link[href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon-reset.css"]`
    );
    if (linkElement) {
      document.head.removeChild(linkElement);
    }

    // Eliminar el script cuando se destruye el componente
    const scriptElement = document.querySelector(
      `script[src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js"]`
    );
    if (scriptElement) {
      document.body.removeChild(scriptElement);
    }
  }

  loadFormPay(postData: any) {
    // this.myModal.nativeElement.click();

    const endpoint = environment.izipay_endpoint;
    //const publicKey = "54188994:testpublickey_E7OdGPxEHDfby1tn8Ctt4in5IGq3BxTdQeXiwUdp0G3QJ"; //clave en modo prueba
    const publicKey = environment.izipay_public_key; // produccion
    let formToken = '';

    const observable = this._auth.getformToken(postData); //se hacer asi porque todos los servicios son interceptados por el interceptors y envia los headers con el token de autentificacion al servidor

    //recibiendo el token
    firstValueFrom(observable)
      .then((resp: any) => {
        formToken = resp;
        //this._console.log(formToken);
        return KRGlue.loadLibrary(
          endpoint,
          publicKey
        ); /* Load the remote library */
      })

      .then(({ KR }) => KR.onError(this.showError))

      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          'kr-language': 'es-ES' /* to update initialization parameter */,
        })
      )

      .then(({ KR }) => KR.onSubmit(this.onSubmit))

      .then(({ KR }) =>
        KR.addForm('#myPaymentForm')
      ) /* add a payment form  to myPaymentForm div*/

      .then(({ KR, result }) => {
        console.log('formulario cargado');
        this.showFormIzipay = true;
        KR.showForm(result.formId);
        // this.orderPagado = true;
      }) /* show the payment form */

      .catch((error) => {
        this.message = error.message + ' (see console for more details)';
        console.log(error);
      });
  }

  private showError = (error: KRError) => {

    console.log('mostrando el error desde izipay');

    this._auth.registrarPago(error).subscribe((response: any) => {});

    this.showAlertRechazado = true;
    // this._console.log(error.detailedErrorMessage);

    // this.closeModal.nativeElement.click();
    this.messageFormModal = error.detailedErrorMessage;

    //detecta cambios en el dom
    this.chRef.detectChanges();

    console.log(error);
  };

  private onSubmit = (paymentData: KRPaymentResponse) => {

    console.log("se pulso pagar");
    
    this.messageRegisterPayment = true;

    this._auth.registrarPago(paymentData).subscribe((response: any) => {

      if (response) {

        this.messageRegisterPayment = false;

        this.message = 'Payment successful!';
        console.log(response);
        // this._console.log(paymentData);

        this.chRef.detectChanges();

        this.order.is_pay = 1;
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Su pago ha sido procesado correctamente',
          confirmButtonText: 'OK'
        })
        
        //cierra el modal
        // this.closeModal.nativeElement.click();
      }
    });

    console.log('submit');
  };
}
