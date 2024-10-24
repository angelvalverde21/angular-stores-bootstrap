import { Component, OnDestroy, OnInit} from '@angular/core';
import { HeaderComponent } from "../../../../header/header.component";
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { CommonModule } from '@angular/common';
import { InputGroupComponent } from "../../../../components/forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../../../../components/buttons/button-save/button-save.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PipesModule } from '../../../../shared/pipes.module';
import { StoreService } from '../../../../services/store.service';
import { LoadingComponent } from "../../../../components/loading/loading.component";
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategorySelectComponent } from "../../../shared/categories/category-select/category-select.component";
import { CategoryCreateComponent } from "../../../shared/categories/category-create/category-create.component";

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, CommonModule, InputGroupComponent, ButtonSaveComponent, ReactiveFormsModule, PipesModule, LoadingComponent, CategorySelectComponent, CategoryCreateComponent],
  templateUrl: './product-create-page.component.html',
  styleUrl: './product-create-page.component.css',

})

export class ProductCreatePageComponent implements OnInit, OnDestroy {


  form!: FormGroup;
  loadingEdit: boolean = false;
  categories: any;
  sizes: any;

  selectedCategory: any = null;
  breadcrumb: string[] = [];
  loadingSize: boolean = false;
  showSize: boolean = false;
  categoriesSubscribe!: Subscription;

  constructor( private _fb: FormBuilder, private _store: StoreService, private _product: ProductService, private router: Router){

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

  selectCategory(category: any) { //este select es el que recibe desde el emit
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
        this.btnSaveReady();
        const url = ['/', this._store.name(), 'auth', 'products', resp.data.id];
        console.log(url);
        
        this.router.navigate(url);
      },
      error: (error: any) => {
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


  // getBreadcrumb(category: any): string[] {
  //   const names = [];
  //   let current = category;

  //   while (current) {
  //     names.unshift(current.name); // Añade el nombre de la categoría al inicio
  //     current = this.findParent(current); // Busca el padre
  //     console.log(current);
      
  //   }

  //   return names;
  // }

  // findParent(category : any): any {
  //   console.log(category);
    
  //   // Aquí debes implementar la lógica para encontrar el padre de la categoría
  //   // Por ejemplo, puedes recorrer `this.categories` para encontrar la categoría que tenga como `id` el `parent_id`
  //   return this.categories.find((cat:any) => {console.log(cat.id); console.log(category.id)}) || null;
  // }

  ngOnDestroy() {
    // Aquí podrías limpiar cualquier suscripción si fuera necesario
    if(this.categoriesSubscribe){
      this.categoriesSubscribe.unsubscribe();
    }
}

}
