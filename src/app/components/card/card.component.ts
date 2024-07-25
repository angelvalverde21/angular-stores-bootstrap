import { CommonModule } from '@angular/common';
import { Component, AfterContentInit, ContentChild, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements AfterContentInit  {

  @ContentChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  showFooter: boolean = false;

  ngAfterContentInit() {
    // Verificar si el card-footer tiene contenido
    this.showFooter = this.footerTemplate != null && this.footerTemplate.createEmbeddedView(null).rootNodes.length > 0;
  }

}
