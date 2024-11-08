import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-custom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-custom.component.html',
  styleUrl: './select-custom.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustomComponent),
      multi: true,
    },
  ],
})
export class SelectCustomComponent implements OnInit, ControlValueAccessor{

  selectedOption: any = null;
  isOptionsVisible: boolean = false;
  @Input() options: any[] = []; 
  @Input() title: string = "Titulo";
  @Input() error: string | null = null;
  @Input() icon: string = 'fas fa-question-circle';

  toggleOptions(): void {
    this.isOptionsVisible = !this.isOptionsVisible;
  }

  selectOption(option: any): void {
    this.selectedOption = option;
    this.title = option.name;  // Actualiza el título con el nombre de la opción seleccionada
    this.isOptionsVisible = false;  // Oculta las opciones
    this.onChange?.(this.selectedOption.id);
  }

  ngOnInit() {
    // Si necesitas inicializar con un valor seleccionado

  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    // throw new Error('Method not implemented.');

    if (this.options && this.options.length > 0 && !this.selectedOption) {

      this.selectedOption = this.options.find((option:any) => option.id == value);
      this.title = this.selectedOption.name;
    }

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

}
