import { Component, inject, TemplateRef } from '@angular/core';
import { HeaderComponent } from '../../../../header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../../services/product.service';
import { PipesModule } from '../../../../shared/pipes.module';

import { StoreService } from '../../../../services/store.service';
import { LoadingCenterComponent } from '../../../../components/loading-center/loading-center.component';
import {} from '@ng-bootstrap/ng-bootstrap';

import {
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

// import { ProductPricesComponent } from '../../../shared/products/prices/product-prices/product-prices.component';
// import { ButtonProductReportComponent } from "../../../../components/reports/button-product-report/button-product-report.component";
import Swal from 'sweetalert2';
import { BreadCrumbComponent } from "../../../shared/bread-crumb/bread-crumb.component";
import { ButtonProductCreateModalComponent } from "../../../../components/buttons/button-product-create-modal/button-product-create-modal.component";
import { ProductCardCostComponent } from "../../../../components/product/product-card-cost/product-card-cost.component";
import { ProductWarehouseComponent } from "../../../shared/products/product-warehouse/product-warehouse.component";
import { environment } from '../../../../../environments/environment';
import { ProductGalleryComponent } from "../../../../components/product/product-gallery/product-gallery.component";
import { ProductEditComponent } from '../../../../components/product/product-edit/product-edit.component';
import { ProductPricesComponent } from "../../../shared/products/prices/product-prices/product-prices.component";
import { ButtonProductReportComponent } from "../../../../components/reports/button-product-report/button-product-report.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    PipesModule,
    RouterModule,
    LoadingCenterComponent,
    NgbModule,
    BreadCrumbComponent,
    ButtonProductCreateModalComponent,
    ProductCardCostComponent,
    ProductWarehouseComponent,
    ProductGalleryComponent,
    ProductEditComponent,
    ProductPricesComponent,
    ButtonProductReportComponent
],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {

 
  loading: boolean = false;
  loadingEdit: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  id: number = 0;
  accordionItem: number = 1;
  totalQuantity: number = 0;
  product: any;
  colors: any;
  warehouses: any;
  store: string = '';
  breadCrumbs: any[] = [];
  // private uploadSubscription!: Subscription;
  componentName : string = "";
  constructor(

    private _product: ProductService,
    private route: ActivatedRoute,
    // private _upload: UploadService,
    private _store: StoreService,
    private router: Router
  ) {
    if(environment.showNameComponent){
      this.componentName = this.constructor.name;
      }
  }



  private modalService = inject(NgbModal);
  closeResult = '';

  items = ['First', 'Second', 'Third'];

  openModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${reason}`;
          console.log(this.closeResult);
        }
      );
  }
 
  ngOnInit(): void {

    this.loadProduct(); //carga el formulario

    this.store = this._store.name()!;
  }

  selected(value: number){
    console.log(value);
    
    this.accordionItem = value;
  }


  private loadProduct() {

    this.loading = true;

    this.id = Number(this.route.snapshot.paramMap.get('product_id'));
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

    console.log(this.id);

    if (this.id) {
      this._product.getBydId(this.id).subscribe({
        next: (resp: any) => {
          console.log(resp);

          this.product = resp.data;

          this.breadCrumbs = [
            {
              name: 'Products',
              link: ['/', this.store, 'auth', 'products'],
            },
            {
              name: this.product.name,
              link: '',
            },
          ];
          // this.product.colors.sort((a:any, b: any) => b.id - a.id);

          this.warehouses = resp.data.store;
          this.loading = false;

        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontro el producto',
          }).then((result) => {
            if (result.isConfirmed) {
              // Aquí ejecutas el código cuando el usuario hace clic en "OK"

              this.router.navigate([this.store, 'auth', 'products']);
              // Por ejemplo, puedes redirigir o ejecutar alguna función
              // this.router.navigate(['/otra-ruta']);
            }
          });
          // console.error('Error loading product:', error);
        },
      });
    }
  }


  getTotalQuantity(sizes: { pivot: { quantity: number } }[]): number {
    return sizes.reduce((acc, size) => acc + size.pivot.quantity, 0);
  }

  updateQuantity(color_size_id: number, $event: any) {
    console.log($event);
    console.log(color_size_id);
  }

  handleQuantityUpdate(quantity: number) {
    // Actualiza el totalQuantity con el valor recibido
    this.totalQuantity = quantity;
    console.log('Quantity updated:', quantity);
  }

  // ngOnDestroy(): void {
  //   if (this.uploadSubscription) {
  //     this.uploadSubscription.unsubscribe();
  //   }
  // }
}
