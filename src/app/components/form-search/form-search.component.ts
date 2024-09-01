import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  hasAuthSearch: boolean = false;

  constructor(

    private router: Router,
    private _common: CommonService,
    private _store: StoreService,
    private route: ActivatedRoute,
  ) {

    //este es un observable que verifica el estado del iconLoading
    this._common.getIconLoadingObservable().subscribe( (value:boolean) => {
      this.iconLoading = value;
    });
  
    this.route.params.subscribe((params) => {
      console.log('imprimiendo parametros');
      console.log(params);
      this.search = params['search'];
    });
  }
  ngOnInit(): void {
    // Verificar si la URL contiene el segmento "auth"
    this.hasAuthSearch = this.router.url.includes('/auth');
    console.log('¿Contiene el segmento "auth"?', this.hasAuthSearch);
  }


  keyUpSearch($event: any){
    if(this.search.length>4){
      this.searchProduct($event);
    }
    
  }

  clickSearch($event: any){
    this.searchProduct($event);
  }

  searchProduct(event: any) {

    this._common.setIconLoading(true);
    this._common.setCardPlaceHolder(true);
    console.log('this._commonService.setShowSearch(true)');
    
    // this.iconLoading = this._commonService.getIconLoading();
    // this._productService.setProducts([]);

    event.preventDefault();

    // this.search = encodeURIComponent(this.search); // Captura el valor del inputd

    this._store.getNameObservable().subscribe((name:string) => {
      this.store = name;
    }); //el parametro base es store

    console.log(this.search); //
    console.log(this.store); //

    if (this.hasAuthSearch) {
      this.router.navigate(['/', this.store, 'auth', 'search', this.search]);
    }else{
      this.router.navigate(['/', this.store, 'search', this.search]);
    }

  }
}
