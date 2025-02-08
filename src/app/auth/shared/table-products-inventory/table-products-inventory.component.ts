import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';  //inject, TemplateRef, ViewEncapsulation son Para el canvas
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
// import { ColorSizeComponent } from "../color-size/color-size.component";
// import { InventoryColorComponent } from "../inventory/inventory-color/inventory-color.component";
// import { ColorComponent } from "../color/color.component";
// import { ButtonInventoryComponent } from "../../../components/buttons/button-inventory/button-inventory.component";
// import { DropdownColorsComponent } from "../../../components/bootstrap/dropdown-colors/dropdown-colors.component";
// import { CardTotalAmountComponent } from "../card-total-amount/card-total-amount.component";
import { InventoryColorSizeComponent } from "../inventory/inventory-color-size/inventory-color-size.component";
import { SkuWarehouseService } from '../../../services/api/sku-warehouse.service';
import { DropdownInventoryComponent } from "../../../components/bootstrap/dropdown-inventory/dropdown-inventory.component";
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { LoadingCenterComponent } from "../../../components/loading-center/loading-center.component";

import { NgbOffcanvas, NgbModal, NgbDropdownModule  } from '@ng-bootstrap/ng-bootstrap';
import { UploadDropzoneColorComponent } from "../../../components/upload-dropzone/upload-dropzone-color/upload-dropzone-color.component"; //Para el canvas y el modal
import { UploadService } from '../../../services/upload.service';
import { ColorService } from '../../../services/color.service';
import Swal from 'sweetalert2';
import { ReportInventoryComponent } from "../../../components/inventory/report-inventory/report-inventory.component";
import { ButtonProductReportComponent } from "../../../components/reports/button-product-report/button-product-report.component";
import { environment } from '../../../../environments/environment';
import { QzService } from '../../../services/qz.service';

@Component({
  selector: 'app-table-products-inventory',
  standalone: true,
  imports: [RouterModule, FormsModule, NgbDropdownModule, CommonModule, InventoryColorSizeComponent, DropdownInventoryComponent, LoadingCenterComponent, UploadDropzoneColorComponent, ReportInventoryComponent, ButtonProductReportComponent],
  templateUrl: './table-products-inventory.component.html',
  styleUrl: './table-products-inventory.component.css',
  encapsulation: ViewEncapsulation.None, //Para el canvas y el modal
})
export class TableProductsInventoryComponent implements OnInit, OnDestroy {

  private offcanvasService = inject(NgbOffcanvas); //Para el canvas

  isQZAvailable: boolean = false; //configuracion de qz

  @Input() product: any; 
  @Input() warehouse_id: number = 0; 
  totalQuantityProduct: number = 0; 
  
  loading: boolean = false;
  store: string = "";
  colorsFilter: any;
  searchTerm: string = '';
  componentName : string = "";

  private warehouseColorsInactiveSubscription!: Subscription; 
  private uploadSubscription!: Subscription;
  private getByIdWarehouseSubscription!: Subscription;

  constructor(
    private _store: StoreService, 
    private _skuWarehouse : SkuWarehouseService, 
    private _product: ProductService,
    private _upload: UploadService,
    private _color: ColorService,
    private qzService: QzService
  ){

    if(environment.showNameComponent){
    this.componentName = this.constructor.name;
    }
    
  }

  private modalService = inject(NgbModal);

  checkQZAvailability() {
    this.qzService.connect().then(() => {
      this.qzService.setAvailable(true);
    }).catch(() => {
      this.qzService.setAvailable(false);
    });
  }

  openTop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'top' });
	}

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  ngOnInit(): void {

    this.checkQZAvailability();

    // console.log(this.product.prices);

    /* calculo de precios temporal */
    this.totalQuantityProduct = this.product.sku.warehouse.pivot?.quantity;

    this.uploadSubscription = this._upload.fileUploaded.subscribe((receive) => {
      // Actualiza el componente con la respuesta del servidor
      console.log('Imagen subida y notificada:', receive);
      // this.product.colors.push(resp.color) // Lo agrega al final
       // Lo agrega al inicio
       this.getByIdWarehouseSubscription = this._color.getByIdWarehouse(this.product.id, this.warehouse_id, receive.color.id).subscribe((resp:any) => {
        console.log('Imagen recibida desde el servidor:', resp.data);
        this.colorsFilter.unshift(resp.data);
        // Swal.fire('Actualizado', 'El color ha sido agregado correctamente', 'success');
        // this.closeModal();
      });
      // product_id: number, warehouse_id: number, color_id: number
      // Actualiza tu UI o realiza otras acciones necesarias
    });


    // this.product.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
    this.loadColors();
    this.store = this._store.leerSlugBase()!;

  }
  
  closeModal() {
    this.modalService.dismissAll();
  }

  uploadFinish(){
    this.closeModal();
    Swal.fire('Finalizado', 'Se ha terminado de subir las imagenes', 'success');
  }

  loadColors(){
    this.colorsFilter = this.product.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
  }

  updateProductColor(quantity: number){

    var sku_warehouse_id = this.product.sku.warehouse.pivot.id;

    console.log('se recibio notifiacion desde el color');
    this._skuWarehouse.getBydId(sku_warehouse_id).subscribe((resp:any) => {

      // this.totalQuantityColor = Number(this.color.sku.warehouse.pivot.quantity) + Number(quantity);
      this.totalQuantityProduct = resp.data.quantity;

      // this.quantityColorUpdated.emit(quantity);
      
    });

  }

  colorsActive: boolean = true;

  deleteSearch(){
    this.searchTerm = "";
    this.loadColors();
  }

  filterItems() {
    // console.log('ok');
    
    this.colorsFilter = this.product.colors.filter((color:any) => 
      color.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    console.log(this.colorsFilter.length);
    
  }

  colorsActiveToggle(event: any){
    // console.log(event);
    this.loading = true;
    this.colorsActive = !this.colorsActive;

    if (this.colorsActive) {
      this.warehouseColorsInactiveSubscription = this._product.getByIdWarehouse(this.product.id, this.warehouse_id).subscribe((resp: any) => {
        this.loading = false;
        this.colorsFilter = resp.data.colors;
        console.log('imprimiendo productos ****************************');
        
        console.log(this.product);
        
      });
    } else {
      this.warehouseColorsInactiveSubscription = this._product.getByIdWarehouseColorsInactive(this.product.id, this.warehouse_id).subscribe((resp: any) => {
        this.loading = false;
        this.colorsFilter = resp.data.colors;
        console.log('imprimiendo productos ****************************');
        
        console.log(this.product);
        
      });
    }
  }


  ngOnDestroy(): void {
    if (this.warehouseColorsInactiveSubscription) {
      this.warehouseColorsInactiveSubscription.unsubscribe();
    }
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
    if (this.getByIdWarehouseSubscription) {
      this.getByIdWarehouseSubscription.unsubscribe();
    }
  }
  
}
