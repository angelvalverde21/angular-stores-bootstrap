import { Component, forwardRef, Input } from '@angular/core';
import { InputGroupComponent } from "../../../components/forms/input-group/input-group.component";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-phone',
  standalone: true,
  imports: [InputGroupComponent, FormsModule],
  templateUrl: './input-phone.component.html',
  styleUrl: './input-phone.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => InputPhoneComponent),
      multi: true,
    }
  ]
})
export class InputPhoneComponent implements ControlValueAccessor{
  
  // @Input() phone: number = 0; 
  
  setPhoneValue: number = 0;


  onChangeCb?: (quantity:number) => void;

  validator(){

  }
  
  setPhone(event:any){

    console.log(event.target.value);
    this.onChangeCb?.(event.target.value);

  }
  
  //seteamos el valor inicial, este valor viene desde el formControlName:  por ejemplo de aqui <app-input-phone formControlName="phone"></app-input-phone> donde esta seteado el valor en el componente padre
  writeValue(phone: number): void {
    // throw new Error('Method not implemented.');
    this.setPhoneValue = phone;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

}
