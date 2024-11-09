import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-button-push',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-push.component.html',
  styleUrl: './button-push.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonPushComponent),
      multi: true,
    },
  ],
})
export class ButtonPushComponent implements ControlValueAccessor {
  // @Input() title: string = "Button";
  status: boolean = false;

  toggleStatus() {
    this.status = !this.status;
    this.onChange(this.status);
  }

  // Implementar los métodos de ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    // throw new Error('Method not implemented.');
    this.status = value;
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
