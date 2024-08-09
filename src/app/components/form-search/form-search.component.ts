import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoadingComponent } from "../loading/loading.component";
import { SetterGetterService } from '../../services/setter-getter.service';
import { CommonService } from '../../services/common.service';

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
export class FormSearchComponent {

  iconLoading: boolean = false;
  
  search: string = '';
  store: string = '';

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private _commonService: CommonService
  ) {

    //este es un observable que verifica el estado del iconLoading
    this._commonService.geIconLoadingObservable().subscribe( (value:boolean) => {
      this.iconLoading = value;
    });

  }

  convertToSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
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

    this._commonService.setIconLoading(true);
    this._commonService.setCardPlaceHolder(true);
    // this.iconLoading = this._commonService.getIconLoading();
    // this._productService.setProducts([]);

    event.preventDefault();

    this.search = this.convertToSlug(this.search); // Captura el valor del inputd

    this.route.params.subscribe((params) => {

      // this.search = params['search']; //el parametro base es store
      this.store = params[environment.parametroBase]; //el parametro base es store

      console.log(this.search); //
      console.log(this.store); //

      
      this.router.navigate(['/', this.store, 'search', this.search]);

      // this.buscando = false;

    });

    // this._storeService.search(this._storeService.getSlug(), search).subscribe({
    //   next: (resp: any) => {
    //     // Manejo de la respuesta exitosa
    //     // console.log(resp.data);

    //     this.buscando = false;

    //     console.log('respuesta para el buscador');

    //     this._productService.setProducts(resp.data);
    //   },
    //   error: (err: any) => {
    //     // Manejo del error

    //     this._productService.setProducts([]);

    //     console.error('No hay resultados desde header', err);
    //   },
    // });
  }
}
