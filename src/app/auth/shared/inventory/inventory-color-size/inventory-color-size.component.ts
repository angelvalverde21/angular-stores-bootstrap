import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject, TemplateRef, ViewEncapsulation 
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { InventorySizeComponent } from '../inventory-size/inventory-size.component';
import { SkuWarehouseService } from '../../../../services/api/sku-warehouse.service';
import { ColorFieldsComponent } from "../../products/colors/color-fields/color-fields.component";
import { Fancybox } from '@fancyapps/ui';
import { NgbModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorService } from '../../../../services/color.service';
import { UploadVariantsComponent } from "../../../../components/upload-dropzone/upload-variants/upload-variants.component";
import Swal from 'sweetalert2';
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { first, Subscription } from 'rxjs';
import { ImageColorComponent } from "./image-color/image-color.component";
import { environment } from '../../../../../environments/environment';
import { ButtonSwitchComponent } from "../../../../components/buttons/button-switch/button-switch.component";

@Component({
  selector: 'app-inventory-color-size',
  standalone: true,
  imports: [
    CommonModule, 
    InventorySizeComponent, 
    ColorFieldsComponent, 
    UploadVariantsComponent, 
    LoadingCenterComponent, 
    LoadingComponent, 
    ImageColorComponent, 
    ButtonSwitchComponent,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  templateUrl: './inventory-color-size.component.html',
  styleUrl: './inventory-color-size.component.css',
  encapsulation: ViewEncapsulation.None
})
export class InventoryColorSizeComponent implements OnInit, OnDestroy {

  @Input() product: any; // Recibe el grupo de formulario de color
  @Input() color: any; // Recibe el grupo de formulario de color
  @Input() warehouse_id: number = 0; // Recibe el grupo de formulario de color
  @Output() quantityColorUpdated = new EventEmitter<number>(); // Notifica cambios en el color
  colorForm!: FormGroup;
  totalQuantityColor: number = 0;
  image: any;
  variants: any;
  loading: boolean = true;
  loadingDelete: boolean = false;
  loadImagesFromColor!: Subscription;
  componentName : string = "";

  constructor(private fb: FormBuilder, private _skuWarehouse : SkuWarehouseService, private elRef: ElementRef, private _color: ColorService) {
    if(environment.showNameComponent){
    this.componentName = this.constructor.name;
    }
  }

	private modalService = inject(NgbModal);

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

  descargarImagen(url: string, nombreArchivo: string) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = nombreArchivo;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch(error => console.error('Error al descargar la imagen:', error));
  }

  get sizes(): FormArray {
    return this.color.get('sizes') as FormArray;
  }

  uploadUpdate(event:any){
      console.log(event);
      
      this.variants.unshift(event);
  } 

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
    this.loadVariants();
	}

  loadVariants(){
    this.loading = true;
    this.loadImagesFromColor = this._color.getImagesByColorId(this.color.product_id, this.color.id).subscribe((resp:any) => {
      console.log(resp.data);
      this.loading = false;
      this.variants = resp.data.images;
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
  
  uploadComplete(event:any){
    console.log('imprimiendo el ultimo archivo subido');
    
    console.log(event);
    
    this.color.image = event;
    // this.closeModal();
    Swal.fire('Finalizado', 'Se ha terminado de subir las imagenes', 'success');
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

  form!: FormGroup;
  
  ngOnInit(): void {

    this.form = this.fb.group({
      status: [''],
    });

    this.form.patchValue(this.color);

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

    if (this.loadImagesFromColor) {
      this.loadImagesFromColor.unsubscribe();
    }
  }

  deleleImage(image_id: number){

    this.loadingDelete = true; 

    this._color.deleteImage(this.color.product_id, this.color.id, image_id).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.variants = this.variants.filter((image:any) => image.id !== image_id);
        Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
        this.loadingDelete = false; 
      },
      error: (error:any) => {
        console.log(error);
      }
    });
    
  }

  //Este metodo elimina de la lista la imagen borrada
  updateImages(image_id_delete: number){ //este metodo viene del emiter desde <app-imagen-color>
    this.variants = this.variants.filter((image:any) => image.id !== image_id_delete);

    const firstImage = this.variants.length > 0 ? this.variants[0] : null;

    if (firstImage) {
      // Si hay una imagen, puedes trabajar con ella
      this.color.image = firstImage;
      console.log('Primera imagen:', firstImage);
    } else {
      // Si no hay ninguna imagen en la lista
      console.log('No hay imágenes disponibles');
    }

  }
    // ngOnDestroy(): void {
  //   if (this.uploadSubscription) {
  //     this.uploadSubscription.unsubscribe();
  //   }
  // }

  success: boolean = false;

  save() {

    this.loading = true;

    console.log('form enviado');
    console.log(this.form.value);

    this.success = false;

    this._color.save(this.form.value, this.color.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.success = true;
        this.loading = false;
        Swal.fire('Actualizado', 'Se ha guardado las opciones del color', 'success');
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      },
    });

  }

}
