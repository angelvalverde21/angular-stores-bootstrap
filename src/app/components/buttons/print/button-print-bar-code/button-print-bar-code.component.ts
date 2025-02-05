import { Component, Input } from '@angular/core';
import { QzService } from '../../../../services/qz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-print-bar-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-print-bar-code.component.html',
  styleUrl: './button-print-bar-code.component.css'
})
export class ButtonPrintBarCodeComponent {

  @Input() isQZAvailable: boolean = false;
  @Input() sku: number = 0;
  @Input() nameButton: string = "";
  @Input() titleLabel: string = "";



  constructor(private qzService: QzService){

  }

  printBarcode() {

    this.qzService.printSku(this.sku, this.nameButton, this.titleLabel);  // Si la conexión es exitosa, imprime la etiqueta

  }


}
