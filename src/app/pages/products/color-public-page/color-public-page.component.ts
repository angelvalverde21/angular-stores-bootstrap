import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { Meta, Title } from '@angular/platform-browser';
import { ColorPublicService } from '../../../services/color-public.service';
import { environment } from '../../../../environments/environment';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-color-public-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './color-public-page.component.html',
  styleUrl: './color-public-page.component.css'
})
export class ColorPublicPageComponent implements OnInit{

  colorTitle: string = 'Nombre del color';
  colorDescription: string = 'Descripción del color';
  colorImageUrl: string = 'https://www.tusitio.com/imagen-del-color.jpg';
  colorUrl: string = 'https://www.tusitio.com/pagina-de-tu-coloro';

  /* ojo estos parametros vienen de la ruta https://dominio.com/ara/products/510/colors/3714 */ 
  @Input() color_id = 0;  //Obtenemos el parametro de ruta asi porque hemos activado en app.config.ts esto: provideRouter routes, withComponentInputBinding())
  @Input() product_id = 0;  //Obtenemos el parametro de ruta asi porque hemos activado en app.config.ts esto: provideRouter routes, withComponentInputBinding())

  color: any = [];
  
  constructor(private meta: Meta, private titleService: Title, private _colorPublic: ColorPublicService, private _store: StoreService) { }

  ngOnInit(): void {


    // console.log(this.color_id);
    // console.log(this.product_id);
    
    this._colorPublic.getById(this.product_id,this.color_id).subscribe((resp:any) => {

      console.log(resp);
      this.color = resp.data;
      this.setMetaTags();

    });

  }

  setMetaTags(): void {
    // Establecer el título de la página
    this.titleService.setTitle(this.color.product.name + ' | ' + this.color.name);

    // Limpiar metaetiquetas anteriores
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="og:url"');

    // Añadir nuevas metaetiquetas Open Graph
    this.meta.addTags([
      { name: 'description', content: this.color.product.name },
      { property: 'og:title', content: this.color.product.name + ' | ' + this.color.name },
      { property: 'og:description', content: 'Catalogo de produtos' },
      { property: 'og:image', content: this.color.images[0].url_medium },
      { property: 'og:url', content: `${environment.urlBase}/${this._store.name()}/products/${this.product_id}/colors/${this.color_id}` }
    ]);
  }

}
