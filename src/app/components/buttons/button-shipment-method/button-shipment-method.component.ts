import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, SimpleChanges} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-button-shipment-method',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-shipment-method.component.html',
  styleUrl: './button-shipment-method.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonShipmentMethodComponent),
      multi: true,
    },
  ],
})
export class ButtonShipmentMethodComponent implements ControlValueAccessor {


  onChange: any = () => {};
  onTouched: any = () => {};
  shipment_method: number = 1;
  @Input() courier: any; 
  

  method(value:number){
    console.log(value);
    this.shipment_method = value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    // throw new Error('Method not implemented.');
    this.shipment_method = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }


}
