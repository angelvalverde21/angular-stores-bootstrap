import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.css',
})
export class CategorySelectComponent implements OnInit, OnDestroy{
  isDropdownOpen = false;
  loading: boolean = true;
  loadingEdit: boolean = false;
  categories: any;
  sizes: any;

  selectedCategory: any = null;
  breadcrumb: string[] = [];
  loadingSize: boolean = false;
  showSize: boolean = false;
  categoriesSubscribe!: Subscription;
  notifyCategoryCreate!: Subscription;


  @Output() emitCategorySelected = new EventEmitter<[]>();

  constructor(private _store: StoreService, private _category: CategoryService) {}

  ngOnInit(): void {
      this.loadCategories();
      this.notifyCategoryCreate = this._category.getNotifyCategoryCreate().subscribe((resp:boolean) => {
        if(resp){
          this.loadCategories();
        }
      });
  }
  
  loadCategories(){

    this.categoriesSubscribe = this._store.categories().subscribe((resp:any) => {
  
      this.loading = false;
      this.categories = resp.data;
      console.log(this.categories);
      
    });

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: any) {

    this.selectedCategory = category;
    this.isDropdownOpen = false;
    this.emitCategorySelected.emit(category);
    // this.breadcrumb = this.getBreadcrumb(category);
    // this.form.get('category_id')?.setValue(category.id);
    // this.loadSizes();

  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.custom-select');
    if (!clickedInside) {
      this.isDropdownOpen = false; // Cerrar dropdown si se hace clic fuera
    }
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscribe) {
      this.categoriesSubscribe.unsubscribe();
    }
    if (this.notifyCategoryCreate) {
      this.notifyCategoryCreate.unsubscribe();
    }
  }
}
