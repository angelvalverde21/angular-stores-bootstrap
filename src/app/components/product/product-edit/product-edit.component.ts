import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ValidatorsService } from '../../../services/validators.service';
import { environment } from '../../../../environments/environment';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ButtonSaveComponent } from '../../buttons/button-save/button-save.component';
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { ButtonSwitchComponent } from "../../buttons/button-switch/button-switch.component";


@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonSaveComponent,
    InputGroupComponent,
    LoadingCenterComponent,
    ButtonSwitchComponent
],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy{

  form!: FormGroup;
  formPrice!: FormGroup;
  @Input() loading: boolean = false;
  loadingEdit: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  id: number = 0;
  componentName : string = "";
  // product: any;
  warehouses: any;
  store: string = '';

  @Input() product: any; 
  

  constructor(
    private fb: FormBuilder,
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

  ngOnInit(): void {
    this.initForm(); //inicial el formulario
    this.loadForm(); //carga el formulario
  }
  ngOnDestroy(): void {

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
          // this.product.colors.sort((a:any, b: any) => b.id - a.id);

          this.warehouses = resp.data.store;
          this.loading = false;
          this.form.patchValue(resp.data);
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

}
