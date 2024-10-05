import { Component, inject, TemplateRef } from '@angular/core';
import { HeaderComponent } from '../../../../header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputGroupComponent } from '../../../../components/forms/input-group/input-group.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../../services/product.service';
import { ButtonSaveComponent } from '../../../../components/buttons/button-save/button-save.component';
import { AlertComponent } from '../../../../components/alerts/alert/alert.component';
import { PipesModule } from '../../../../shared/pipes.module';
import { ColorComponent } from '../../../shared/color/color.component';
import { ProductColorComponent } from '../../../shared/products/product-color/product-color.component';
import { UploadDropzoneColorComponent } from '../../../../components/upload-dropzone/upload-dropzone-color/upload-dropzone-color.component';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../../services/store.service';
import { HeaderProductComponent } from '../header-product/header-product.component';
import { ButtonInventoryComponent } from '../../../../components/buttons/button-inventory/button-inventory.component';
import { LoadingCenterComponent } from '../../../../components/loading-center/loading-center.component';
import { ButtonColorsComponent } from '../../../../components/buttons/button-colors/button-colors.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { DropdownComponent } from '../../../../components/bootstrap/dropdown/dropdown.component';
import { DropdownInventoryComponent } from '../../../../components/bootstrap/dropdown-inventory/dropdown-inventory.component';
import { DropdownColorsComponent } from '../../../../components/bootstrap/dropdown-colors/dropdown-colors.component';
import {} from '@ng-bootstrap/ng-bootstrap';

import {
  NgbModal,
  NgbModule,
  NgbAccordionModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductWarehouseComponent } from '../../../shared/products/product-warehouse/product-warehouse.component';
import { ProductPricesComponent } from '../../../shared/products/prices/product-prices/product-prices.component';
import Swal from 'sweetalert2';
import { BreadCrumbComponent } from "../../../shared/bread-crumb/bread-crumb.component";
import { ButtonSwitchComponent } from "../../../../components/buttons/button-switch/button-switch.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    HeaderComponent,
    InputGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonSaveComponent,
    AlertComponent,
    PipesModule,
    ColorComponent,
    ProductColorComponent,
    UploadDropzoneColorComponent,
    RouterModule,
    HeaderProductComponent,
    ButtonInventoryComponent,
    LoadingCenterComponent,
    ButtonColorsComponent,
    ModalComponent,
    DropdownComponent,
    DropdownInventoryComponent,
    DropdownColorsComponent,
    NgbModule,
    ProductWarehouseComponent,
    ProductPricesComponent,
    BreadCrumbComponent,
    ButtonSwitchComponent
],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  form!: FormGroup;
  formPrice!: FormGroup;
  loading: boolean = false;
  loadingEdit: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  id: number = 0;
  totalQuantity: number = 0;
  product: any;
  colors: any;
  warehouses: any;
  store: string = '';
  breadCrumbs: any[] = [];
  // private uploadSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _product: ProductService,
    private route: ActivatedRoute,
    // private _upload: UploadService,
    private _store: StoreService,
    private router: Router
  ) {}

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
    this.initForm(); //inicial el formulario
    this.loadForm(); //carga el formulario

    this.store = this._store.name()!;
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      body: [''],
      tags: [''],
      over_sale: [''],
      sell_size_unique: [''],
      colors: this.fb.array([]),
    });
  }

  private loadForm() {
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
          this.form.patchValue(resp.data);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
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

  btnSaveReady() {
    this.btnActive = true;
    this.loadingEdit = false;
  }

  btnSaveBusy() {
    this.btnActive = false;
    this.loadingEdit = true;
  }

  save() {
    this.btnSaveBusy();

    console.log('form enviado');

    this.success = false;

    this._product.save(this.form.value, this.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        console.log('recibiendo el producto guardado');
        Swal.fire('Guardado', 'El producto ha sido actualizado', 'success');
        // this.product = resp.data; //Momentaneamente se ha bloqueado la respuesta para que no colicione con
        this.success = true;
        this.btnSaveReady();
      },
      error: (error: any) => {
        console.error(error);
        this.btnSaveReady();
      },
    });
  }

  savePrice() {
    this.btnSaveBusy();

    console.log('form enviado');

    this.success = false;

    this._product.save(this.form.value, this.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.product = resp.data;
        this.success = true;
        this.btnSaveReady();
      },
      error: (error: any) => {
        console.error(error);
        this.btnSaveReady();
      },
    });
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
