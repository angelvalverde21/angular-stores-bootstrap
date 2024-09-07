import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { CommonService } from '../../services/common.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent
],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.css'
})
export class FormSearchComponent implements OnInit {

  iconLoading: boolean = false;
  
  search: string = '';
  store: string = '';
  path: string = '';
  hasAuthSearch: boolean = false;
  btnActive: boolean = true;

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

  searchProduct(event: any) {

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




    switch (this.path) {


      
      case 'auth':
        console.log('navigate a auth/search');
        this.router.navigate(['/', this._store.leerSlugBase(), 'auth', 'search', this.search]); //this.search viene del formulario de este componente
        break;
    
      case 'authInventory':
          console.log('navigate a auth/authInventory');
          this.route.params.subscribe((params) => {
            console.log(params);
            
            this.router.navigate(['/', this._store.leerSlugBase(), 'auth', 'w', params['warehouse_id'] , 'inventory', 'search', this.search]);
          });
        break;
          
      default:
        console.log('navigate a search');
        this.router.navigate(['/', this._store.leerSlugBase(), 'search', this.search]);
        break;
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
