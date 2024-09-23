import { Component, HostListener, OnDestroy } from '@angular/core';
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


@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, CommonModule, InputGroupComponent, ButtonSaveComponent, ReactiveFormsModule, PipesModule, LoadingComponent],
  templateUrl: './product-create-page.component.html',
  styleUrl: './product-create-page.component.css'
})

export class ProductCreatePageComponent {

  loading: boolean = true;
  form!: FormGroup;
  loadingEdit: boolean = false;
  categories: any;
  sizes: any;
  isDropdownOpen = false;
  selectedCategory: any = null;
  breadcrumb: string[] = [];
  loadingSize: boolean = false;
  showSize: boolean = false;

  constructor( private _fb: FormBuilder, private _store: StoreService, private _product: ProductService){

  }

  ngOnInit(): void {
    this.initForm(); //inicial el formulario

    this._store.categories().subscribe((resp:any) => {
      this.loading = false;
      this.categories = resp.data;
    });

  }

  private initForm(): void {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      body: [''],
      tags: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      sizes: ['', [Validators.required]],
    });
  }



  toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: any) {
      this.selectedCategory = category;
      this.isDropdownOpen = false;
      this.breadcrumb = this.getBreadcrumb(category);
      this.form.get('category_id')?.setValue(category.id); 
      this.loadSizes();
  }
  selectSize(sizes_values: any) {
    this.form.get('sizes')?.setValue(sizes_values.target.value); 
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

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const clickedInside = target.closest('.custom-select');
      if (!clickedInside) {
          this.isDropdownOpen = false; // Cerrar dropdown si se hace clic fuera
      }
  }

  getBreadcrumb(category: any): string[] {
    const names = [];
    let current = category;

    while (current) {
      names.unshift(current.name); // Añade el nombre de la categoría al inicio
      current = this.findParent(current); // Busca el padre
      console.log(current);
      
    }

    return names;
  }

  findParent(category : any): any {
    console.log(category);
    
    // Aquí debes implementar la lógica para encontrar el padre de la categoría
    // Por ejemplo, puedes recorrer `this.categories` para encontrar la categoría que tenga como `id` el `parent_id`
    return this.categories.find((cat:any) => {console.log(cat.id); console.log(category.id)}) || null;
  }

  loadSizes(){

    this.loadingSize = true;
    this._store.productSizes().subscribe((resp:any) => {
      this.showSize = true;
      this.loadingSize = false;
      this.sizes = resp.data;
    });
  }

  ngOnDestroy() {
    // Aquí podrías limpiar cualquier suscripción si fuera necesario
}

}
