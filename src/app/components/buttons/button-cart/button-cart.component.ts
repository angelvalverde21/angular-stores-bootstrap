import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
  NgbOffcanvasConfig,
} from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from '../../order-summary/order-summary.component';
import { Router, RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { CartService } from '../../../services/cart.service';
import { CartComponent } from "../../cart/cart.component";

@Component({
  selector: 'app-button-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, OrderSummaryComponent, CartComponent],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
  templateUrl: './button-cart.component.html',
  styleUrl: './button-cart.component.css'
})
export class ButtonCartComponent {

  closeResult = '';
  @ViewChild('content', { static: true }) content: any;
  cartOpenSubscription!: Subscription;
  cartSubscription!: Subscription;
  store: string = '';
  items: any;
  loading: boolean = true;
  count: number = 0;

  constructor(
    private _store: StoreService,
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
    private _cart: CartService,
    private router: Router
  ) {
    // customize default values of offcanvas used by this component tree
    config.position = 'end';
    config.keyboard = false;

  }
  ngOnDestroy(): void {
    if (this.cartOpenSubscription) {
      this.cartOpenSubscription.unsubscribe();
    }
  }

  isVisible = false;

  ngOnInit() {
    this.store = this._store.name()!;
    this.cartOpenSubscription = this._cart.getOpenCartObservable()
      .subscribe((visible: boolean) => {
        this.openCanvas(this.content);
      });

      this.cartSubscription = this._cart.getItemsObservable()
      .subscribe((resp: any) => {
        this.count = resp.length;
      });
  }

  // closeCanvas() {
  //   this._cart.closeCart();
  // }

  openCanvas(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, {
        ariaLabelledBy: 'offcanvas-basic-title',
        panelClass: 'custom-offcanvas',
      })
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

  realizarPedido() {
    this.router.navigate(['/', this.store, 'checkout']);
    this.offcanvasService.dismiss();
  }

}
