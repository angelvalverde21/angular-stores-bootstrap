import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-button-envio-es',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-envio-es.component.html',
  styleUrl: './button-envio-es.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonEnvioEsComponent),
      multi: true,
    },
  ],
})
export class ButtonEnvioEsComponent implements OnInit, OnDestroy, ControlValueAccessor{

  // Implementar los métodos de ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};
  envio_es: number = 1;
  @Input() acepta_pago_destino: boolean = false; 
  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  envioEs(value:number){
    console.log(value);
    this.envio_es = value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    // throw new Error('Method not implemented.');
    this.envio_es = value;
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
