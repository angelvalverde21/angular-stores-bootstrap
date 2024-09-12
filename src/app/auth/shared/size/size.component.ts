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
import { InputGroupComponent } from '../../../components/forms/input-group/input-group.component';
import { PipesModule } from '../../../shared/pipes.module';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { InventoryService } from '../../../services/api/inventory.service';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupComponent,
    PipesModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './size.component.html',
  styleUrl: './size.component.css',
})
export class SizeComponent {
  
  loading: boolean = false;
  @Input() size: any; // Recibe el grupo de formulario de color
  @Input() warehouse_id: number = 0; // Recibe el grupo de formulario de color
  @Output() quantitySizeUpdated = new EventEmitter<number>(); // Notifica cambios en el color
  sizeForm!: FormGroup;
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _inventory: InventoryService
  ) {}

  selectInput() {
    this.myInput.nativeElement.select();
  }

  private initForm(): void {

    // console.log(this.size);
    
    this.sizeForm = this.fb.group({
      id: [null],
      name: [''],
      product_id: [null],
      color_sizes: this.fb.group({
        sku: this.fb.group({
          warehouses: this.fb.array([
            this.fb.group({
              pivot: this.fb.group({
                sku_id: [null],
                warehouse_id: [null],
                quantity: [null], // Control para el quantity
                id: [null],
              }),
            }),
          ]),
        }),
      }),
      sku: this.fb.group({
        id: [null],
        quantity: [null],
      }),
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

      this._inventory
        .updateColorSize(this.sizeForm.value.sku)
        .subscribe((resp: any) => {
          console.log(resp);
          this.loading = false;
          this.cdr.detectChanges();
          this.quantitySizeUpdated.emit(this.sizeForm.value.pivot.quantity);
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

  ngOnInit(): void {
    this.initForm(); // Inicializa el formulario
    if (this.size) {
      // console.log('Size data:', this.size); // Verifica los datos de entrada
      this.sizeForm.patchValue({
        id: this.size.id,
        name: this.size.name,
        product_id: this.size.product_id,
        color_sizes: {
          sku: {
            warehouses: {
              pivot: {
                sku_id: this.size.color_sizes.sku.warehouses[0]?.pivot.sku_id,
                warehouse_id: this.size.color_sizes.sku.warehouses[0]?.pivot.warehouse_id,
                quantity: this.size.color_sizes.sku.warehouses[0]?.pivot.quantity,
                id: this.size.color_sizes.sku.warehouses[0]?.pivot.id
              },
            },
          },
        },
        sku: {
          id: this.size.sku?.id, // Asegúrate de que `pivot` y `quantity` existan
          quantity: this.size.sku?.quantity, // Asegúrate de que `pivot` y `quantity` existan
        },
      });
    }
  }
}
