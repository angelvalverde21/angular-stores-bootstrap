import { Component, Input } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfService } from '../../../services/pdf.service';
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

  downloadPdf(tipo: string) {

    this.pdfService.downloadPdf(this.order_id,tipo).subscribe({

      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.order_id + '-'+ tipo +'.pdf';  // Nombre por defecto para el archivo descargado
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
