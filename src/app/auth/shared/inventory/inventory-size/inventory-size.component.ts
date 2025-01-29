import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputGroupComponent } from '../../../../components/forms/input-group/input-group.component';
import { PipesModule } from '../../../../shared/pipes.module';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { InventoryService } from '../../../../services/api/inventory.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PdfService } from '../../../../services/pdf.service';
import { QzService } from '../../../../services/qz.service';
import { ShortTitlePipe } from '../../../../shared/Pipes/short-title.pipe';
// import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventory-size',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupComponent,
    PipesModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './inventory-size.component.html',
  styleUrl: './inventory-size.component.css'
})
export class InventorySizeComponent {

  loading: boolean = false;
  hasColor: boolean = false;
  quantityInit: number = 0;
  quantityAfter: number = 0;
  @Input() product: any; // Recibe el grupo de formulario de color
  @Input() size: any; // Recibe el grupo de formulario de color
  @Input() warehouse_id: number = 0; // Recibe el grupo de formulario de color
  @Output() quantitySizeUpdated = new EventEmitter<number>(); // Notifica cambios en el color
  sizeForm!: FormGroup;
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;
  stockWarehouse: any;

  updateQuantitySubject: Subject<number> = new Subject();

  /* printes */
  title = 'QZ Tray Angular Example';
  selectedPrinter: string = '';
  printers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private pdfService: PdfService,
    private cdr: ChangeDetectorRef,
    private _inventory: InventoryService,
    private qzService: QzService
  ) {

  }

  ngOnInit(): void {

    /* printes */


    /* fin de printes */

    this.updateQuantitySubject
    .pipe(debounceTime(350))  // Retrasa la búsqueda 300ms después del último evento
    .subscribe((quantity: number) => {
      console.log('se recibio');
      
      this.updateStock(quantity);
    });

    // console.log(this.size.color_size.sku);
    // console.log(this.size.color_size.sku.warehouse.pivot);
    // this.stockWarehouse = this.size.color_size.sku.warehouse.pivot
    if (this.size.color_size) {
      this.stockWarehouse =  this.size.color_size.sku.warehouse.pivot;
      this.hasColor = true;
      this.quantityInit = this.size.color_size.sku.warehouse.pivot.quantity; //Cantidad antes de ingresar el nuevo valor (ColorSize)
    } else {
      this.stockWarehouse =  this.size.sku.warehouse.pivot;
      this.hasColor = false;
      this.quantityInit = this.size.sku.warehouse.pivot.quantity; //Cantidad antes de ingresar el nuevo valor (Color)
    }
    // this.stockWarehouse = this.size.color_size ? this.size.color_size.sku.warehouse.pivot : this.size.sku.warehouse.pivot
  
    this.initForm(); // Inicializa el formulario
    if (this.stockWarehouse) {
      console.log('Size data:', this.size); // Verifica los datos de entrada
      this.sizeForm.patchValue(this.stockWarehouse);
    }
  }

  selectInput() {
    this.myInput.nativeElement.select();
  }

  private initForm(): void {

    // console.log(this.size);
    
    this.sizeForm = this.fb.group({
      sku_id: [null],
      warehouse_id: [null],
      quantity: [null], // Control para el quantity
      id: [null],
    });
    
  }

  updateKeyupStock($event: any){

    var quantityInput = $event.target.value;
    console.log(quantityInput);
    
    if (quantityInput >= 0) {
      this.updateQuantitySubject.next(quantityInput); // Emite el término de búsqueda
    }
  }
  
  updateStock(quantity: number) {

    this.quantityAfter = quantity;

    if (this.quantityAfter != this.quantityInit) {
      
      console.log('actualizando stock');

      if (quantity >= 0) {

        this.loading = true;
        //Aqui guardamos el nuevo valor del cantidad
        
        console.log(this.sizeForm.value);
        
        this._inventory
          .updateWarehouseColorSize(this.sizeForm.value, this.warehouse_id)
          .subscribe((resp: any) => {
            console.log(resp);
            // Swal.fire('Actualizado', 'El inventario ha sido actualizado.', 'success');
            this.loading = false;
            this.cdr.detectChanges();
            this.quantitySizeUpdated.emit(this.sizeForm.value.quantity);
          });
  
        console.log();

      }


    }else{
      console.log('como la cantidad ingresada es la misma que la original no se hace nada');
      
    }


  }

  // async printerQzBarcodePDF() {
  //   try {
  //     this.printers = await this.qzPrinterService.getPrinters();
      
  //     if (this.printers.length > 0) {
  //       this.selectedPrinter = this.printers[2] || this.printers[0];
  //     } else {
  //       throw new Error('No hay impresoras disponibles.');
  //     }
  
  //     console.log(`📠 Impresora seleccionada: ${this.selectedPrinter}`);
  
  //     const response = await fetch('https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf');
  //     if (!response.ok) throw new Error(`Error al descargar PDF: ${response.statusText}`);
  
  //     const pdfBlob = await response.blob();
  
  //     await this.qzPrinterService.printPDF(pdfBlob, this.selectedPrinter);
  //     console.log('✅ PDF impreso correctamente');
  
  //   } catch (error) {
  //     console.error('❌ Error en la impresión:', error);
  //   }
  // }
  

  print() {

    let title = this.product.name.split(' ');
    // Primero, intentamos conectar a QZ Tray
    this.qzService.connect().then(() => {
      this.qzService.printLabel(title[0] + ' ' + title[1], this.size.color_size.sku.id, this.sizeForm.value.quantity);  // Si la conexión es exitosa, imprime la etiqueta
    }).catch((error) => {
      console.error('No se pudo conectar con QZ Tray. Asegúrate de que esté corriendo.');
    });
  }

  printSize() {

    let title = this.product.name.split(' ');
    // Primero, intentamos conectar a QZ Tray
    this.qzService.connect().then(() => {
      this.qzService.printLabelSize(this.size.color_size.sku.id, this.size.name);  // Si la conexión es exitosa, imprime la etiqueta
    }).catch((error) => {
      console.error('No se pudo conectar con QZ Tray. Asegúrate de que esté corriendo.');
    });
  }


  generateBarcode(sku_id: number, quantity: number) {

    Swal.fire({
      title: 'Espere...',
      html: "Estamos generando los codigos de barras",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.pdfService.downloadStockBarCode(sku_id, quantity).subscribe({

          next: (response: Blob) => {
    
            const timestampInSeconds = Math.floor(Date.now() / 1000);
            
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sku-' + timestampInSeconds + '-' + sku_id + '-' +  quantity + '.pdf';  // Nombre por defecto para el archivo descargado
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

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo descargar el archivo de codigo de barras',
              confirmButtonText: 'Aceptar',
            });

            console.error('Error al descargar el PDF', error);
          }
    
        });
    
      }
    })
    
  }

}
