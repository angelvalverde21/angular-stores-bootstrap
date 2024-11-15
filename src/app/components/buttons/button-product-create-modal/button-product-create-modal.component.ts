import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { CategorySelectComponent } from "../../../auth/shared/categories/category-select/category-select.component";
import { CategoryCreateComponent } from "../../../auth/shared/categories/category-create/category-create.component";
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonSaveComponent } from "../button-save/button-save.component";
import { PipesModule } from '../../../shared/pipes.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-button-product-create-modal',
  standalone: true,
  imports: [
    InputGroupComponent, 
    CategorySelectComponent, 
    CategoryCreateComponent, 
    LoadingCenterComponent, 
    CommonModule, 
    ButtonSaveComponent,
    ReactiveFormsModule,
    PipesModule,
  ],
  templateUrl: './button-product-create-modal.component.html',
  styleUrl: './button-product-create-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonProductCreateModalComponent {

  form!: FormGroup;
  loadingEdit: boolean = false;
  categories: any;
  sizes: any;

  selectedCategory: any = null;
  breadcrumb: string[] = [];
  loadingSize: boolean = false;
  showSize: boolean = false;
  categoriesSubscribe!: Subscription;
  modal: any;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _store: StoreService,
    private _product: ProductService,
    private router: Router
  ){
		config.backdrop = 'static';
		config.keyboard = false;
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true, size: 'lg' }, );
  }

    // private _modal = inject(NgbModal);

    ngOnInit(): void {
      this.initForm(); //inicial el formulario
    }
  
    private initForm(): void {
      this.form = this._fb.group({
        name: ['', [Validators.required]],
        body: [''],
        tags: [''],
        price: ['', [Validators.required]],
        category_id: ['', [Validators.required]],
        sizes: ['', [Validators.required]],
      });
    }
  
    selectCategory(category: any) {
      //este select es el que recibe desde el emit
      console.log(category);
  
      this.selectedCategory = category;
      // this.isDropdownOpen = false;
      // this.breadcrumb = this.getBreadcrumb(category);
      this.form.get('category_id')?.setValue(category.id);
      this.loadSizes();
    }
  
    selectSize(sizes_values: any) {
      this.form.get('sizes')?.setValue(sizes_values.target.value);
    }
  
    loadSizes() {
      this.loadingSize = true;
      this._store.productSizes().subscribe((resp: any) => {
        this.showSize = true;
        this.loadingSize = false;
        this.sizes = resp.data;
      });
    }
  
    save() {

      this.btnSaveBusy();
  
      console.log('form enviado create');
  
      this.success = false;
  
      this._product.create(this.form.value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.success = true;
          // this.btnSaveReady();
          const url = ['/', this._store.name(), 'auth', 'products', resp.data.id];
          console.log(url);
          this.modal.close();
          this.router.navigate(url);
          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'El producto sea ha creado correctamente',
            confirmButtonText: 'OK',
            showConfirmButton: true
          })
          
        },
        error: (error: any) => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error interno',
          });
          
          console.error(error);
          this.btnSaveReady();
        },
      });
    }
  
    success: boolean = false;
    btnActive: boolean = false;
  
    btnSaveReady() {
      this.btnActive = true;
      this.loadingEdit = false;
    }
  
    btnSaveBusy() {
      this.btnActive = false;
      this.loadingEdit = true;
    }
  
    ngOnDestroy() {
      // Aquí podrías limpiar cualquier suscripción si fuera necesario
      if (this.categoriesSubscribe) {
        this.categoriesSubscribe.unsubscribe();
      }
    }
    

}
