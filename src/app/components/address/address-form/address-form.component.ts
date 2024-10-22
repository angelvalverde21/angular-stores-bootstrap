import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupComponent } from '../../forms/input-group/input-group.component';
import { InputDistrictIdComponent } from '../../../shared/forms/input-district-id/input-district-id.component';
import { CartService } from '../../../services/cart.service';
import { mergeMap, of, startWith, switchMap } from 'rxjs';
import { OverlayComponent } from '../../overlay/overlay.component';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputGroupComponent,
    InputDistrictIdComponent,
    OverlayComponent,
  ], // Importar módulos necesarios
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
  ],
})
export class AddressFormComponent implements ControlValueAccessor {
  // @Input() isValid!: (controlName: string) => boolean;
  // @Input() isInvalid!: (controlName: string) => boolean;
  @Input() addressData: any[] = [];
  @Output() formValidity = new EventEmitter<boolean>(); // Emisor para la validez del formulario
  @Input() header: boolean = true;
  @Input() formType: string = '';

  @Input() saving: boolean = true; //este valor se maneja desde los componentes padres
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder, private _cart: CartService) {}

  ngOnInit(): void {
    // Inicializa el formulario vacío o con validadores

    switch (this.formType) {

      //Para los formularios de venta rapida no se pide mayor verificacion
      case 'quick':
        this.addressForm = this.fb.group({
          phone: [''],
          dni: [''],
          name: [''],
          primary: [''],
          secondary: [''],
          references: [''],
          district_id: [''],
        });

        break;

      case 'addressToUser':
        this.addressForm = this.fb.group({
          phone: ['', [Validators.required]],
          dni: [''],
          name: ['', [Validators.required]],
          primary: ['', [Validators.required]],
          secondary: [''],
          references: [''],
          district_id: ['', [Validators.required]],
        });

        break;

      default:
        this.addressForm = this.fb.group({
          phone: [
            '',
            {
              //[0123456789]{1,9} Expresion regular que quiere decir que se puede usar numeros del 0 al 9 y que la longitud aceptada va de 1 digito a 9 digitos
              //[0123456789]{9} Expresion regular que quiere decir que se puede usar numeros del 0 al 9 y que la longitud aceptada solo es de 9 digitos
              validators: [
                Validators.required,
                Validators.pattern('9[0123456789]{8}'),
              ],
              asyncValidators: [this._cart.verifyPhone],
            },
          ],
          dni: [
            '',
            {
              validators: [
                Validators.required,
                Validators.pattern('[0123456789]{8,8}'),
              ],
              asyncValidators: [this._cart.verifyDni],
            },
          ],
          name: ['', [Validators.required]],
          primary: ['', [Validators.required]],
          secondary: [''],
          references: [''],
          district_id: ['', [Validators.required]],
        });

        //... pero esto es cuando tambien se quiere escuchar a los validadores cuando luego de teclear actuan: osea los validadores travez de rxjs
        this.addressForm.valueChanges
          .pipe(
            startWith(this.addressForm.value), // Emitir el valor inicial del formulario
            switchMap(() => {
              // Devuelve un observable que emitirá la validez después de que se complete la validación
              return this.addressForm.statusChanges.pipe(
                mergeMap(() => of(this.addressForm.valid)) // Emite la validez
              );
            })
          )
          .subscribe((isValid) => {
            //Este codigo es para escuchar cuando se escucha cambios al momento de teclar en los campos y el formulario va emitiendo el form.valid del formulario ....
            this.onChange(this.addressForm.value);
            this.onTouched();
            this.formValidity.emit(isValid); // Emitir la validez
          });

        break;
    }

    if (this.addressData && this.addressData.length) {
      // Asegúrate de que este es un objeto, no un array
      this.addressForm.patchValue(this.addressData);
    }
  }

  // isValid(value: string):boolean{
  //   if (this.addressForm.get(value)?.valid && this.addressForm.get(value)?.touched) {
  //     // console.log('VALIDO');
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  isInvalid(value: string): boolean {
    if (
      this.addressForm.get(value)?.invalid &&
      this.addressForm.get(value)?.touched
    ) {
      // console.log('INVALIDO');
      return true;
    } else {
      return false;
    }
  }

  // Implementar los métodos de ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.addressForm.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.addressForm.disable() : this.addressForm.enable();
  }
}
