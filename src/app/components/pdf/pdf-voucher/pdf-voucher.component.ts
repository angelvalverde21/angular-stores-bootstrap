import { Component, Input } from '@angular/core';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-pdf-voucher',
  standalone: true,
  imports: [],
  templateUrl: './pdf-voucher.component.html',
  styleUrl: './pdf-voucher.component.css',
})
export class PdfVoucherComponent {
  @Input() order_id: number = 0;

  constructor(private pdfService: PdfService) {}

  downloadPdf() {

    this.pdfService.downloadVoucher(this.order_id).subscribe({

      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.order_id + '-voucher.pdf';  // Nombre por defecto para el archivo descargado
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  // Limpia la URL creada
      },
      
      error: (error) => {
        console.error('Error al descargar el PDF', error);
      }

    });
  }
  
}


