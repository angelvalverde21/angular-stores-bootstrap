import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SizeComponent } from "../size/size.component";

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SizeComponent],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorComponent {

  @Input() color: any; // Recibe el grupo de formulario de color
  @Output() colorUpdated = new EventEmitter<void>(); // Notifica cambios en el color
  colorForm!: FormGroup;
  
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
    this.colorUpdated.emit();
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

}
