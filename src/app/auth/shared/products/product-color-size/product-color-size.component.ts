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
  selector: 'app-product-color-size',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupComponent,
    PipesModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './product-color-size.component.html',
  styleUrl: './product-color-size.component.css'
})
export class ProductColorSizeComponent {

  loading: boolean = false;
  @Input() size: any; // Recibe el grupo de formulario de color
  @Output() quantitySizeUpdated = new EventEmitter<number>(); // Notifica cambios en el color
  sizeSkuForm!: FormGroup;
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;
  stock: any;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _inventory: InventoryService
  ) {

  }

  ngOnInit(): void {

    console.log(this.size.color_size.sku);
    console.log(this.size.color_size.sku);
    this.stock = this.size.color_size.sku
    
    
    this.initForm(); // Inicializa el formulario
    if (this.stock) {
      // console.log('Size data:', this.size); // Verifica los datos de entrada
      this.sizeSkuForm.patchValue(this.stock);
    }
  }

  selectInput() {
    this.myInput.nativeElement.select();
  }

  private initForm(): void {

    // console.log(this.size);
    
    this.sizeSkuForm = this.fb.group({
      quantity: [null], // Control para el quantity
      id: [null],
    });
    
  }

  updateStock($event: any) {

    console.log('actualizando stock');
    
    // console.log(this.sizeSkuForm);
    // console.log(this.sizeSkuForm.value);
    // console.log(this.sizeSkuForm.value.pivot);
    // console.log(this.sizeSkuForm.value.sku);
    

    if ($event.target.value > 0) {
      this.loading = true;

      this._inventory
        .updateColorSize(this.sizeSkuForm.value.sku)
        .subscribe((resp: any) => {
          console.log(resp);
          this.loading = false;
          this.cdr.detectChanges();
          this.quantitySizeUpdated.emit(this.sizeSkuForm.value.pivot.quantity);
        });
      // console.log();
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
