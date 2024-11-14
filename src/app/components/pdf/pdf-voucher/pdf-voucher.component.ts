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



}


