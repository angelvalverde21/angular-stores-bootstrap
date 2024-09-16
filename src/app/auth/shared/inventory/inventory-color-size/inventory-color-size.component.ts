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
  selector: 'app-inventory-color-size',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupComponent,
    PipesModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './inventory-color-size.component.html',
  styleUrl: './inventory-color-size.component.css'
})
export class InventoryColorSizeComponent {

  loading: boolean = false;
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
    this.stockWarehouse = this.size.color_size.sku.warehouse.pivot
    
    
    this.initForm(); // Inicializa el formulario
    if (this.stockWarehouse) {
      // console.log('Size data:', this.size); // Verifica los datos de entrada
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

    console.log('actualizando stock');
    
    // console.log(this.sizeForm);
    // console.log(this.sizeForm.value);
    // console.log(this.sizeForm.value.pivot);
    // console.log(this.sizeForm.value.sku);
    

    if ($event.target.value > 0) {
      this.loading = true;

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

    // setTimeout(() => {
    //   console.log($event.target.value);
    //   console.log(this.size.pivot.id);
    //   this.loading = false;
    //   console.log(this.loading);
    //   
    // },1000);
  }


}
