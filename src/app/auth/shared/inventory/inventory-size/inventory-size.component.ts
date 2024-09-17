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
  @Input() size: any; // Recibe el grupo de formulario de color
  @Input() warehouse_id: number = 0; // Recibe el grupo de formulario de color
  @Output() quantitySizeUpdated = new EventEmitter<number>(); // Notifica cambios en el color
  sizeForm!: FormGroup;
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;
  stockWarehouse: any;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _inventory: InventoryService
  ) {

  }

  ngOnInit(): void {

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
  
  updateStock($event: any) {

    this.quantityAfter = $event.target.value;

    if (this.quantityAfter != this.quantityInit) {
      
      console.log('actualizando stock');

      if ($event.target.value > 0) {

        this.loading = true;
        //Aqui guardamos el nuevo valor del cantidad
        
  
        console.log(this.sizeForm.value);
        
        this._inventory
          .updateWarehouseColorSize(this.sizeForm.value, this.warehouse_id)
          .subscribe((resp: any) => {
            console.log(resp);
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

}
