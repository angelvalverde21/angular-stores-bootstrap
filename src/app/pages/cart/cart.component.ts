import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
  NgbOffcanvasConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from '../../services/store.service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})
export class CartComponent implements OnInit, OnDestroy {
  closeResult = '';
  @ViewChild('contentModal', { static: true }) contentModal: any;
    @ViewChild('content', { static: true }) content: any;
    cartSubscription!: Subscription;
  store: string = '';
  items: any;
  loading: boolean = true;

  constructor(
    private _store: StoreService,
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
    private _cart: CartService,
    private router: Router,
  ) {
    // customize default values of offcanvas used by this component tree
    config.position = 'end';
    config.keyboard = false;

    this.items = this._cart.getItems();
  }
  ngOnDestroy(): void {
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe();
    }
  }

  isVisible = false;

  ngOnInit() {

    this.store = this._store.name()!;
    this.cartSubscription = this._cart.getOpenCartObservable().subscribe((visible:boolean) => {

      this.openCanvas(this.content);
      this.items = this._cart.getItems();
      this.loading = false;

    });
  }

  deleteItem(index:any){
    console.log(index);

    this.items = this._cart.getItems();

    if (index > -1) { // Verifica si el índice es válido
      console.log('item eliminado');
      // console.log(index);
      
      this.items.splice(index, 1); // Elimina 1 elemento en la posición 'index'

      this._cart.setItems(this.items);
    }

    this.items = this._cart.getItems();

  }
  // closeCanvas() {
  //   this._cart.closeCart();
  // }

  openCanvas(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title', panelClass: 'custom-offcanvas' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    // this.openModal(this.contentModal);

    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  realizarPedido(){
    this.router.navigate(['/',this.store,'checkout']);
    this.offcanvasService.dismiss();
  }
  
}
