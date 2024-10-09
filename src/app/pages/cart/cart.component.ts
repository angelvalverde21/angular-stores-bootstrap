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

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
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
      this.openCanvas(this.content)
    });
  }

  // closeCanvas() {
  //   this._cart.closeCart();
  // }

  openCanvas(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
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
