import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SizeComponent } from "../size/size.component";

@Component({
  selector: 'app-color-size',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SizeComponent],
  templateUrl: './color-size.component.html',
  styleUrl: './color-size.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSizeComponent {

  @Input() color: any; // Recibe el grupo de formulario de color
  @Input() warehouse_id: number = 0; // Recibe el grupo de formulario de color
  @Output() quantityColorUpdated = new EventEmitter<number>(); // Notifica cambios en el color
  colorForm!: FormGroup;
  totalQuantity: number = 0;
  
  constructor(private fb: FormBuilder) {}

  private initForm(): void {

    this.colorForm = this.fb.group({
      id: ['', [Validators.required]],
      sku_quantity: [''],
      product_id: [''],
      image: this.fb.group({
        id: [''],
        thumbnail: [''],
        url_thumbnail: ['']
      }),
      sizes: this.fb.array([]),
    });

  }

  get sizes(): FormArray {
    return this.color.get('sizes') as FormArray;
  }

  // Método para emitir el evento cuando haya cambios en el color
  updateColor() {
    this.quantityColorUpdated.emit();
  }

  private updateSizes(sizes: any[]): void {
    const sizeFormGroups = sizes.map(size => this.fb.group({
      id: [size.id],
      name: [size.name],
      quantity: [size.pivot.quantity] // Ajusta según la estructura real
    }));
    const formArray = this.fb.array(sizeFormGroups);
    this.colorForm.setControl('sizes', formArray);
  }

  ngOnInit(): void {
    this.initForm(); //inicial el formulario
    if (this.color) {
      this.colorForm.patchValue(this.color);
      this.updateSizes(this.color.sizes);
    }
  }

  save(){

  }

  handleQuantityUpdate(quantity: number) {
    // Actualiza el totalQuantity con el valor recibido
    this.totalQuantity = quantity;
    console.log('Quantity updated:', quantity);

    this.quantityColorUpdated.emit(quantity);
  }

}
