import { Component, Input, ElementRef, ViewChild, AfterViewInit   } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ButtonDotsHorizontalComponent } from "../../buttons/button-dots-horizontal/button-dots-horizontal.component";
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
// import { register } from 'swiper/element/bundle';
// register();

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [ButtonDotsHorizontalComponent, NgbCarousel, CommonModule],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css'
})
export class ProductGalleryComponent {

  // @ViewChild('carouselTrack', { static: true }) carouselTrack!: ElementRef<HTMLDivElement>;

  componentName : string = "";
  @Input() product: any; 
  

  constructor(){
    if(environment.showNameComponent){
    this.componentName = this.constructor.name;
    }
  }
  @ViewChild('newSwiper') newSwiper: any;
}
