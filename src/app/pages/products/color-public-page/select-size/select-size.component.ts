import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-size.component.html',
  styleUrl: './select-size.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SelectSizeComponent),
      multi: true,
    }
  ]
})
export class SelectSizeComponent implements ControlValueAccessor, AfterViewInit {


  @Input() sizes: any[] = [];

  sizeNameSelected: string | null = null;
  onChangeCb?: (sizeName:any) => void;

  ngAfterViewInit(): void {
    console.log(this.sizes);
  }


  selectSize(size: any){
    this.sizeNameSelected = size.target.value;
    // this.onChangeCb && this.onChangeCb(sizeName);
    this.onChangeCb?.(size.target.value);
  }

  writeValue(sizeName: string): void {
    // throw new Error('Method not implemented.');
    this.sizeNameSelected = sizeName;
    
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
