import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { Meta, Title } from '@angular/platform-browser';
import { ColorPublicService } from '../../../services/color-public.service';
import { environment } from '../../../../environments/environment';
import { StoreService } from '../../../services/store.service';
import { ColorImagesComponent } from "./color-images/color-images.component";
import { ColorExtractDescriptionComponent } from "./color-extract-description/color-extract-description.component";
import { SelectColorComponent } from "./select-color/select-color.component";
import { SelectSizeComponent } from "./select-size/select-size.component";
import { ButtonAddCartComponent } from "./button-add-cart/button-add-cart.component";
import { InfoShippingComponent } from "./info-shipping/info-shipping.component";
import { CommonModule } from '@angular/common';
import { SelectQuantityComponent } from "./select-quantity/select-quantity.component";
import { ColorPriceComponent } from "./color-price/color-price.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPublicService } from '../../../services/product-public.service';
import { LoadingCenterComponent } from "../../../components/loading-center/loading-center.component";
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-color-public-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ColorImagesComponent,
    ColorExtractDescriptionComponent,
    SelectColorComponent,
    SelectSizeComponent,
    ButtonAddCartComponent,
    InfoShippingComponent,
    CommonModule,
    SelectQuantityComponent,
    ColorPriceComponent,
    LoadingCenterComponent,
    ReactiveFormsModule
],
  templateUrl: './color-public-page.component.html',
  styleUrl: './color-public-page.component.css'
})

export class ColorPublicPageComponent implements OnInit, OnDestroy{

  colorTitle: string = 'Nombre del color';
  colorDescription: string = 'Descripción del color';
  colorImageUrl: string = 'https://www.tusitio.com/imagen-del-color.jpg';
  colorUrl: string = 'https://www.tusitio.com/pagina-de-tu-coloro';

  /* ojo estos parametros vienen de la ruta https://dominio.com/ara/products/510/colors/3714 */ 
  //@Input() color_id = 0;  //Obtenemos el parametro de ruta asi porque hemos activado en app.config.ts esto: provideRouter routes, withComponentInputBinding()), pero hay un incoveniente no detecta cambios en los parametros, por lo que en este caso es mejor usar un this.route.params.suscribe
  @Input() product_id = 0;  //Obtenemos el parametro de ruta asi porque hemos activado en app.config.ts esto: provideRouter routes, withComponentInputBinding())

  product : any;
  images : any;
  colors: any = [];
  color: any = [];
  color_id: number = 0;
  // product_id: number = 0;
  loadingColor: boolean = true;
  loading: boolean = true;
  isFormInit: boolean = false;

  productPublicSubscription!: Subscription;
  cartSubscription!: Subscription;

  constructor(
    private meta: Meta, 
    private titleService: Title, 
    private _colorPublic: ColorPublicService, 
    private _store: StoreService, 
    private route: ActivatedRoute,
    private router: Router,
    private _productPublic: ProductPublicService,
    private fb: FormBuilder,
    private _cart: CartService
  ) { }

  ngOnDestroy(): void {
    if (this.productPublicSubscription) {
      this.productPublicSubscription.unsubscribe();
    }
  }

  form!: FormGroup;

  private initForm(): void {
    // Verificar si el formulario ya fue inicializado

      this.form = this.fb.group({
        color: [this.color, [Validators.required]],
        size: ['', [Validators.required]],
        quantity: ['1', [Validators.required]]
      });
    
  }

  // private initForm(): void {
  //   this.form = this.fb.group({
  //     color_id: ['', [Validators.required]],
  //     size: [''],
  //     quantity: ['', [Validators.required]]
  //     // colors: this.fb.array([]),
  //   });
  // }

  save(){

    /*
    {
      "color_id": 3955,
      "type": "color_size_id",
      "talla": "M",
      "size_id": "537",
      "quantity": 1,
      "image": "http://super.test/storage/images/products/colors/3649d901ae78601e318deb4e7f04645f.jpg",
      "product_id": 510,
      "prices": [
          {
              "id": 486,
              "type": "normal",
              "quantity": 1,
              "value": 109.95,
              "value_total": 109.95
          }
      ],
      "name": "Vestido Gitana Floreados",
      "price": 109.95,
      "subtotal": 109.95
    },
    */

    const color = this.form.get('color')?.value;
    const size = this.form.get('size')?.value;
    const quantity = this.form.get('quantity')?.value;

    const price = this.product.price || this.product.prices[0];
    const item =     {
      "color_id": color.id,
      "type": "color_size_id",
      'size_id': size.id,
      "quantity": quantity,
      "image": color.image.url_medium,
      "product_id": this.product.id,
      "prices": this.product.prices,
      "name": this.product.name,
      "price": price.value,
      "subtotal": quantity * price.value
    }

    console.log(item);
    

    console.log(this.form.value);
    this._cart.addItem(item);
    this._cart.setOpenCart(true);

  }

  ngOnInit(): void {

    
    // console.log(this.color_id);
    // console.log(this.product_id);

    // console.log('inico');
    this.initForm();
    
    //Esto solo se llama una vez
    this.productPublicSubscription = this._productPublic.getById(this.product_id).subscribe({

      next: (resp:any) =>  {
        console.log(resp);
        this.product = resp.data;
        this.colors = this.product.colors;
  
        //Esta susbscripcion va cambiando conforme se va moviendo la url, pero la subscripcion de arriba no cambia
        this.route.params.subscribe((params) => {
  
          this.product_id = params['product_id']; // Asegúrate que coincide con la ruta
          this.color_id = params['color_id']; // Asegúrate que coincide con la ruta
          
          //En caso los parametros cambien, se vuelve a reinicializar el formulario

          this.isFormInit = true;

          console.log(this.isFormInit);
          
          // this.loading = true;
    
          this.color = this.getColorById(this.color_id);
          this.loading = false;
          this.images = this.color.images;
    
          this.initForm();
          
        });
      },

      error: (error:Error) => {
        this.router.navigate(['/','error-404']);
      }

    });

  }

  getColorById(id: number) {
    return this.colors.find((color:any) => color.id == id);
  }

  setMetaTags(): void {
    // Establecer el título de la página
    this.titleService.setTitle(this.product.name + ' | ' + this.color.name);

    // Limpiar metaetiquetas anteriores
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="og:url"');

    // Añadir nuevas metaetiquetas Open Graph
    this.meta.addTags([
      { name: 'description', content: this.product.name },
      { property: 'og:title', content: this.product.name + ' | ' + this.color.name },
      { property: 'og:description', content: 'Catalogo de produtos' },
      { property: 'og:image', content: this.color.images[0].url_medium },
      { property: 'og:url', content: `${environment.urlBase}/${this._store.name()}/products/${this.product_id}/colors/${this.color_id}` }
    ]);
  }

}
