import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-quantity',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-quantity.component.html',
  styleUrl: './select-quantity.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SelectQuantityComponent),
      multi: true,
    }
  ]
})
export class SelectQuantityComponent implements ControlValueAccessor{

  @Input() quantityMax: number = 0; 
  
  selectQuantity: number = 0;
  onChangeCb?: (quantity:number) => void;
  
  setQuantity(quantity: number){

    this.selectQuantity = quantity;

    this.onChangeCb?.(this.selectQuantity);
  }
  
  sumQuantity(quantity: number){

    console.log(quantity);

    this.selectQuantity = Number(this.selectQuantity) + Number(quantity);

    if(this.selectQuantity <= 0){
      this.selectQuantity = 1;
    }

    if (this.selectQuantity > this.quantityMax) {
      this.selectQuantity = this.quantityMax;
    }

    // this.selectQuantity = quantity;
    // this.onChangeCb && this.onChangeCb(sizeName);
    this.onChangeCb?.(this.selectQuantity);
  }


  writeValue(quantity: number): void {
    // throw new Error('Method not implemented.');
    this.selectQuantity = quantity;

  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {

    // console.log(fn);
    
    // throw new Error('registerOnTouched Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState Method not implemented.');
  }

}
