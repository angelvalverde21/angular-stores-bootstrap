import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-izipay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './izipay.component.html',
  styleUrl: './izipay.component.css'
})
export class IzipayComponent {

  @Input() order: any; 
  
  loadFormPay(postData: any) {

    this.myModal.nativeElement.click();

    const endpoint = environment.izipay_endpoint;
    //const publicKey = "54188994:testpublickey_E7OdGPxEHDfby1tn8Ctt4in5IGq3BxTdQeXiwUdp0G3QJ"; //clave en modo prueba
    const publicKey = environment.izipay_public_key; // produccion
    let formToken = "";

    const observable = this._auth.getformToken(postData); //se hacer asi porque todos los servicios son interceptados por el interceptors y envia los headers con el token de autentificacion al servidor

    //recibiendo el token
    firstValueFrom(observable).then((resp: any) => {
        formToken = resp;
        //this._console.log(formToken);
        return KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      })

      .then(({ KR }) => KR.onError(this.showError))

      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": "es-ES", /* to update initialization parameter */
        })
      )

      .then(({ KR }) => KR.onSubmit(this.onSubmit))

      .then(({ KR }) =>
        KR.addForm("#myPaymentForm")
      ) /* add a payment form  to myPaymentForm div*/

      .then(({ KR, result }) => {
        this._console.log('formulario cargado');
        this.showFormIzipay = true;
        KR.showForm(result.formId);
        // this.orderPagado = true;
      })/* show the payment form */

      .catch(
        error => {
          this.message = error.message + " (see console for more details)";
          this._console.log(error);
        }
      )
  };

  private showError = (error: KRError) => {

    this._console.log('mostrando el error desde izipay');

    this._auth.registrarPago(error).subscribe((response: any) => {

    });

    this.showAlertRechazado = true;
    // this._console.log(error.detailedErrorMessage);
    
    // this.closeModal.nativeElement.click();
    this.messageFormModal = error.detailedErrorMessage;

    //detecta cambios en el dom
    this.chRef.detectChanges();

    this._console.log(error);

  }
}
