import { Component, Input } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfService } from '../../../services/pdf.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-button-pdf',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './button-pdf.component.html',
  styleUrl: './button-pdf.component.css'
})
export class ButtonPdfComponent {

  @Input() order_id: number = 0;

  constructor(private pdfService: PdfService) {}

  downloadPdf(tipo: string, message: string = "") {

    Swal.fire({
      title: 'Espere...',
      html: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.pdfService.downloadPdf(this.order_id,tipo).subscribe({

          next: (response: Blob) => {
    
            const timestampInSeconds = Math.floor(Date.now() / 1000);
            
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.order_id + '-' + timestampInSeconds + '-' + tipo + '.pdf';  // Nombre por defecto para el archivo descargado
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  // Limpia la URL creada

            Swal.close();
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Correcto',
            //   text: 'Hemos generado su pdf',
            //   confirmButtonText: 'OK',
            //   showConfirmButton: true,
            //   timer: 1000,  // 1000 milisegundos = 1 segundo
            //   timerProgressBar: true
            // })
            
          },
          
          error: (error) => {
            console.error('Error al descargar el PDF', error);
          }
    
        });
    
      }
    })
    

  }

}
