import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductColorComponent } from '../../../shared/products/product-color/product-color.component';
import { CommonModule } from '@angular/common';
import { LoadingCenterComponent } from '../../../../components/loading-center/loading-center.component';
import { HeaderComponent } from '../../../../header/header.component';
import { UploadDropzoneColorComponent } from '../../../../components/upload-dropzone/upload-dropzone-color/upload-dropzone-color.component';
import { Subscription } from 'rxjs';
import { UploadService } from '../../../../services/upload.service';
import { DropdownInventoryComponent } from '../../../../components/bootstrap/dropdown-inventory/dropdown-inventory.component';
import { DropdownColorsComponent } from '../../../../components/bootstrap/dropdown-colors/dropdown-colors.component';
import { FormsModule } from '@angular/forms';
import { BreadCrumbComponent } from "../../../shared/bread-crumb/bread-crumb.component";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-colors-page',
  standalone: true,
  imports: [
    ProductColorComponent,
    FormsModule,
    CommonModule,
    LoadingCenterComponent,
    HeaderComponent,
    RouterModule,
    UploadDropzoneColorComponent,
    DropdownInventoryComponent,
    DropdownColorsComponent,
    BreadCrumbComponent
],
  templateUrl: './product-colors-page.component.html',
  styleUrl: './product-colors-page.component.css',
})
export class ProductColorsPageComponent implements OnInit {
  product_id: number = 0;
  product: any;
  loading: boolean = true;
  store: string = '';
  private uploadSubscription!: Subscription;
  private getColorsSubscription!: Subscription;
  colorsFilter: any;
  searchTerm: string = '';
  breadCrumbs: any[] = [];

  constructor(
    private _product: ProductService,
    private route: ActivatedRoute,
    private _store: StoreService,
    private _upload: UploadService
  ) {

  }

  ngOnInit(): void {

    this.product_id = Number(this.route.snapshot.paramMap.get('product_id'));

    console.log(this.product_id);
    

    this.loading = true;
    this.store = this._store.name()!;

    this.uploadSubscription = this._upload.fileUploaded.subscribe((resp) => {
      // Actualiza el componente con la respuesta del servidor
      console.log('Imagen subida y notificada:', resp);
      // this.product.colors.push(resp.color) // Lo agrega al final
      this.product.colors.unshift(resp.color); // Lo agrega al inicio

      // Actualiza tu UI o realiza otras acciones necesarias
    });

    this.getColorsSubscription = this._product.getColorsActive(this.product_id).subscribe((resp: any) => {
      this.loading = false;
      this.product = resp.data;

      console.log(resp);
      
      
      this.breadCrumbs = [
        {
          name: 'Products',
          link: ['/', this.store, 'auth', 'products'],
        },
        {
          name: this.product.name,
          link: ['/', this.store, 'auth', 'products',this.product.id],
        },
        {
          name: 'Colors',
          link: '',
        },
      ];
      
      this.colorsFilter = resp.data.sort(
        (a: any, b: any) => b.sku.quantity - a.sku.quantity
      );

      // this.colorsFilter = this.product.colors;
      console.log(resp.data.colors);
    });
  }

  ngOnDestroy(): void {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
    if (this.getColorsSubscription) {
      this.getColorsSubscription.unsubscribe();
    }
  }

  deleteSearch() {
    this.searchTerm = '';
    this.colorsFilter = this.product.colors;
  }

  filterItems() {

    this.colorsFilter = this.product.colors.filter((color:any) => 
      color.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // this.colorsFilter = this.colorsFilter.sort(
    //   (a: any, b: any) => b.sku.quantity - a.sku.quantity
    // );
  }
}
