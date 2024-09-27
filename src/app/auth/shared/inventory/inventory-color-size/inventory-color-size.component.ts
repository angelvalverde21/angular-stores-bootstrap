import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { InventorySizeComponent } from '../inventory-size/inventory-size.component';
import { SkuWarehouseService } from '../../../../services/api/sku-warehouse.service';
import { ColorFieldsComponent } from "../../products/colors/color-fields/color-fields.component";
import { Fancybox } from '@fancyapps/ui';


@Component({
  selector: 'app-inventory-color-size',
  standalone: true,
  imports: [CommonModule, InventorySizeComponent, ColorFieldsComponent],
  templateUrl: './inventory-color-size.component.html',
  styleUrl: './inventory-color-size.component.css'
})
export class InventoryColorSizeComponent implements OnInit, OnDestroy {

  @Input() color: any; // Recibe el grupo de formulario de color
  @Input() warehouse_id: number = 0; // Recibe el grupo de formulario de color
  @Output() quantityColorUpdated = new EventEmitter<number>(); // Notifica cambios en el color
  colorForm!: FormGroup;
  totalQuantityColor: number = 0;
  image: any;

  constructor(private fb: FormBuilder, private _skuWarehouse : SkuWarehouseService, private elRef: ElementRef) {}

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

  // private updateSizes(sizes: any[]): void {
  //   const sizeFormGroups = sizes.map(size => this.fb.group({
  //     id: [size.id],
  //     name: [size.name],
  //     quantity: [size.pivot.quantity] // Ajusta según la estructura real
  //   }));
  //   const formArray = this.fb.array(sizeFormGroups);
  //   this.colorForm.setControl('sizes', formArray);
  // }

  ngOnInit(): void {

    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });

    this.initForm(); //inicial el formulario

    if (this.color) {
      console.log('color modelo');
      // this.image = { src: this.color.image.url_thumbnail, thumb: this.color.image.url_thumbnail };
      console.log(this.color);
      
      this.colorForm.patchValue(this.color);
      this.totalQuantityColor = this.color.sku.warehouse.pivot.quantity;
      // this.updateSizes(this.color.sizes);
    }
    
  }

  save(){

  }

  handleQuantityUpdate(quantity: number) {
    // Actualiza el totalQuantity con el valor recibido
    this.totalQuantityColor = quantity;
    console.log('Quantity updated:', quantity);
    
    this.quantityColorUpdated.emit(quantity);
  }
  
  getUpdateQuantity(quantity: number){ //Esta funcion se activa cuando el size emite el envento
    
    console.log('getUpdateQuantity');
    
    console.log(quantity);
    console.log(this.color.sku.warehouse.pivot.quantity);
    console.log(this.color.sku.warehouse.pivot);
    //El color total de este almacen en particular se guarda en sku_warehouse, cuyo id es this.color.sku.warehouse.pivot.id

    var sku_warehouse_id = this.color.sku.warehouse.pivot.id;

    this._skuWarehouse.getBydId(sku_warehouse_id).subscribe((resp:any) => {

      // this.totalQuantityColor = Number(this.color.sku.warehouse.pivot.quantity) + Number(quantity);
      this.totalQuantityColor = resp.data.quantity;

      this.quantityColorUpdated.emit(quantity);
      
    });
    
  }

  setColorTitle(title: string){
    this.color.name = title;
  }

  ngOnDestroy(): void {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

}
