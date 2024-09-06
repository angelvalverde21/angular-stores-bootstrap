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
    this.sizeForm = this.fb.group({
      id: ['', [Validators.required]],
      name: [''],
      product_id: [''],
      pivot: this.fb.group({
        id: [''],
        quantity: [''],
      }),
    });
  }

  updateStock($event: any) {

    if ($event.target.value > 0) {
      this.loading = true;

      this._inventory
        .updateColorSize(this.sizeForm.value.pivot)
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
        pivot: {
          id: this.size.pivot?.id, // Asegúrate de que `pivot` y `quantity` existan
          quantity: this.size.pivot?.quantity, // Asegúrate de que `pivot` y `quantity` existan
        },
      });
    }
  }
}
