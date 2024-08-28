import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from "../../components/accordion/accordion-item/accordion-item.component";

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [HeaderComponent, CommonModule, AccordionItemComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {

  sections: any;

  constructor(){

    this.sections = [
      {
        'id':'1',
        'title':'Redes',
        'col':[
          {
            'name':'instagram',
            'type':'text',
            'placeHolder':'Luvadi',
            'icon':''
          },
          {
            'name':'facebook',
            'type':'text',
            'placeHolder':'Facebook',
            'icon':''
          },
          {
            'name':'tiktok',
            'type':'text',
            'placeHolder':'TikTok',
            'icon':''
          },
        ],

      },
      {
        'id':'2',
        'title':'Informacion de la pagina web',
        'col':[
          {
            'name':'title',
            'type':'text',
            'placeHolder':'Titulo de la Pagina web',
            'icon':''
          },
          {
            'name':'iniciales',
            'type':'text',
            'placeHolder':'Iniciales, Ejemplo ARA',
            'icon':''
          },
          {
            'name':'dominio',
            'type':'text',
            'placeHolder':'Dominio' 
          },
          {
            'name':'ship_min',
            'type':'text',
            'placeHolder':'Monto minimo para envio gratis',
            'icon':''
          },
          {
            'name':'whatsapp',
            'type':'text',
            'placeHolder':'Whatsapp',
            'icon':''
          },
        ],

      },
    ]
  }

}
