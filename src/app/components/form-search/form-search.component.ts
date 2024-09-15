import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { CommonService } from '../../services/common.service';
import { StoreService } from '../../services/store.service';
import { PipesModule } from '../../shared/pipes.module';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
    PipesModule
],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.css'
})
export class FormSearchComponent implements OnInit {

  iconLoading: boolean = false;
  
  search: string = '';
  store: any;
  warehouses: any;
  path: string = '';
  hasAuthSearch: boolean = false;
  btnActive: boolean = true;
  warehouse_id: number = 0;

  constructor(

    private router: Router,
    private _common: CommonService,
    private _store: StoreService,
    private route: ActivatedRoute
  ) {

    //este es un observable que verifica el estado del iconLoading
    this._common.getIconLoadingObservable().subscribe( (value:boolean) => {
      this.iconLoading = value;
    });
  
    this.route.params.subscribe((params) => {
      console.log('imprimiendo parametros from');
      console.log(params);
      this.search = params['search'];
      this.btnActive = false; 
    });

  }

  ngOnInit(): void {
    // Verificar si la URL contiene el segmento "auth"

    console.log('init de form search');
    
    this.route.params.subscribe((params) => {
      params['warehouse_id'] != undefined ? this.warehouse_id = params['warehouse_id']: this.warehouse_id = 0;
      console.log(this.warehouse_id);
    });

    console.log('imprimendo store con warehouses');
    

    this.store = this._store.storeWarehouses();

    console.log(this.store);
    

    // this.path = this.router.url.includes('/auth');

    this.path = this.router.url.includes('/inventory') ? 'authInventory' : (this.router.url.includes('/auth') ? 'auth' : '');
    
    console.log('¿Contiene el segmento "auth"?', this.hasAuthSearch);
  }

  keyUpSearch($event: any){
    this.btnActive = true; 
    if(this.search.length>5){
      this.searchProduct($event);
    }
    // this.searchProduct($event);
  }

  keyEnter($event: any){
    console.log('click en keyup');
    this.btnActive = true; 
    console.log($event);
    // if(this.search.length>4){
    //   this.searchProduct($event);
    // }
    this.searchProduct($event);
  }

  clickSearch($event: any){

    this.btnActive = true;
    console.log('click en search');
    console.log($event);
    console.log(this.search);
    this.searchProduct($event);
  }

  // onWarehouseChange(event: Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   console.log('Selected warehouse ID:', selectedValue);
  //   this.warehouse_id = Number(selectedValue); // Asigna el valor seleccionado
  //   if(this.warehouse_id > 0){
  //     this.path = "searchInventoryWarehouse"
  //   }
  // }

  cambiarAlmacen(){
    
  }

  searchProduct(event: any = null) {

    if (this.search) {
      this._common.setIconLoading(true);
      this._common.setCardPlaceHolder(true);
      console.log('this._commonService.setShowSearch(true)');
      
      // this.iconLoading = this._commonService.getIconLoading();
      // this._productService.setProducts([]);
  
      // this.search = encodeURIComponent(this.search); // Captura el valor del inputd
  
      // this._store.getNameObservable().subscribe((name:string) => {
      //   this.store = name;
      // }); //el parametro base es store
  
      // console.log(this.search); //
      console.log('imprimiendo url desde form');
      
      console.log(this.path); //
  
      if(this.warehouse_id > 0){
        this.path = "searchInventoryWarehouse"
      }
  
      switch (this.path) {
  
        case 'auth':
          console.log('navigate a auth/search');
          this.router.navigate(['/', this._store.leerSlugBase(), 'auth', 'products', 'search', this.search]); //this.search viene del formulario de este componente
          break;
      
        case 'authInventory':
            console.log('navigate a auth/authInventory');
            this.route.params.subscribe((params) => {
              console.log(params);
              this.router.navigate(['/', this._store.leerSlugBase(), 'auth', 'w', params['warehouse_id'] , 'inventory', 'search', this.search]);
            });
          break;
      
        case 'searchInventoryWarehouse':
            console.log('navigate a auth/searchInventoryWarehouse');
            if (this.search) {
              this.router.navigate(['/', this._store.leerSlugBase(), 'auth', 'products', 'warehouse', this.warehouse_id, 'search', this.search]); //this.search viene del formulario de este componente
            }
          break;
            
        default:
          console.log('navigate a search');
          this.router.navigate(['/', this._store.leerSlugBase(), 'search', this.search]);
          break;
      }
    }

    // if (this.hasAuthSearch) {
    //   this.router.navigate(['/', this._store.leerSlugBase(), 'auth', 'search', this.search]);
    //   console.log('navigate a auth/search');
      
    // }else{
    //   this.router.navigate(['/', this._store.leerSlugBase(), 'search', this.search]);
    //   console.log('navigate a search');
    // }

    // event.preventDefault();

  }
}
