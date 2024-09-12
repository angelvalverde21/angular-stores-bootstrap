import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../header/header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { AlertComponent } from '../../../../components/alerts/alert/alert.component';
import { PipesModule } from '../../../../shared/pipes.module';
import { ColorComponent } from "../../../shared/color/color.component";
import { ProductColorComponent } from "../../../shared/products/product-color/product-color.component";
import { UploadDropzoneColorComponent } from "../../../../components/upload-dropzone/upload-dropzone-color/upload-dropzone-color.component";
import { Subscription } from 'rxjs';
import { UploadService } from '../../../../services/upload.service';
import { StoreService } from '../../../../services/store.service';
import { HeaderProductComponent } from "../header-product/header-product.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    HeaderComponent,
    InputGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonSaveComponent,
    LoadingComponent,
    AlertComponent,
    PipesModule,
    ColorComponent,
    ProductColorComponent,
    UploadDropzoneColorComponent,
    RouterModule,
    HeaderProductComponent
],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  form!: FormGroup;
  loading: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  id: number = 0;
  totalQuantity: number = 0;
  product: any;
  colors: any;
  warehouses: any;
  store: string = "";
  private uploadSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _product: ProductService,
    private route: ActivatedRoute,
    private _upload: UploadService,
    private _store: StoreService
  ) {}

  ngOnInit(): void {
    this.initForm(); //inicial el formulario
    this.loadForm(); //carga el formulario

    this.store = this._store.name()!;
    this.uploadSubscription = this._upload.fileUploaded.subscribe((resp) => {
      // Actualiza el componente con la respuesta del servidor
      console.log('Imagen subida y notificada:', resp);
      this.product.colors.push(resp.color)
      // Actualiza tu UI o realiza otras acciones necesarias
    });

  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      body: [''],
      tags: [''],
      colors: this.fb.array([]),
    });
  }

  private loadForm() {
    this.loading = true;

    this.id = Number(this.route.snapshot.paramMap.get('product_id'));

    if (this.id) {
      this._product.getBydId(this.id).subscribe({
        next: (resp: any) => {
          console.log(resp);

          this.product = resp.data;
          this.warehouses = resp.data.store;
          this.loading = false;
          this.form.patchValue(resp.data);
        },
        error: (error: any) => {
          console.error('Error loading product:', error);
        },
      });
    }
  }

  btnSaveReady() {
    this.btnActive = true;
    this.loading = false;
  }

  btnSaveBusy() {
    this.btnActive = false;
    this.loading = true;
  }

  save() {
    this.btnSaveBusy();

    console.log('form enviado');

    this.success = false;

    this._product.save(this.form.value, this.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
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

  updateQuantity(color_size_id: number, $event: any){
    console.log($event);
    console.log(color_size_id);
  }

  handleQuantityUpdate(quantity: number) {
    // Actualiza el totalQuantity con el valor recibido
    this.totalQuantity = quantity;
    console.log('Quantity updated:', quantity);

  }

  ngOnDestroy(): void {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }
}
