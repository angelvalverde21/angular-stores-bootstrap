import {
  AfterViewInit,
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
export class AddressFormComponent implements ControlValueAccessor, AfterViewInit {
  // @Input() isValid!: (controlName: string) => boolean;
  // @Input() isInvalid!: (controlName: string) => boolean;
  @Input() addressData: any[] = [];
  @Output() formValidity = new EventEmitter<boolean>(); // Emisor para la validez del formulario
  @Input() header: boolean = true;
  @Input() formType: string = '';

  @Input() saving: boolean = true; //este valor se maneja desde los componentes padres
  addressForm!: FormGroup;
  ejecutarExtrerDatos: boolean = true;


  constructor(private fb: FormBuilder, private _cart: CartService) {

  }

  ngAfterViewInit(): void {

        // console.log(this.addressForm.get('district_id'));
    // const districtValue = this.addressForm.get('district_id')?.value; // 150117
    // console.log(districtValue);
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
  }

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
          district_id: ['']
        });

        break;

      case 'addressToUser':

      console.log("addressToUser");
      

        this.addressForm = this.fb.group({

          phone: ['', [Validators.required]],
          dni: [''],
          name: ['', [Validators.required]],
          primary: ['', [Validators.required]],
          secondary: [''],
          references: [''],
          district_id: ['', [Validators.required]]

        });

        break;

      default:

        console.log("default");
      
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
                Validators.pattern('^[0-9]{8}$'),
              ],
              asyncValidators: [this._cart.verifyDni],
            },
          ],
          name: ['', [Validators.required]],
          primary: ['', [Validators.required]],
          secondary: [''],
          references: [''],
          district_id: ['', [Validators.required]]
        });

        //... pero esto es cuando tambien se quiere escuchar a los validadores cuando luego de teclear actuan: osea los validadores travez de rxjs


        break;
    }


    this.addressForm.get('references')?.valueChanges.subscribe(value => {
      if (value) {
        this.extraerInformacion();
        this.ejecutarExtrerDatos = false;
      }
    });

    //Esto se hace para recibir el valor de district_id en caso se este editando una direccion
    // this.addressForm.get('district_id')?.valueChanges.subscribe((newValue) => {
    //   this.updatedDistrictId(newValue);
      
    // });

    if (this.addressData && this.addressData.length) {
      // Asegúrate de que este es un objeto, no un array
      this.addressForm.patchValue(this.addressData);
    }

  }

  // isUpdating: boolean = false;

  // updatedDistrictId(districtId: string) {

  //   //para que no haya un bucle infinito se hace esto
  //   if (this.isUpdating) {
  //     return; // Si ya estamos actualizando, no hacemos nada
  //   }
    
  //   this.isUpdating = true; // Establecer la bandera a true para evitar bucles

  //   if (districtId) {
  //     this.addressForm.get('district_id')?.patchValue(districtId); //al establecer el valor de district_id con patchValue hace que se dispare la subscripcion de valueChanges, por lo que empieza un bucle infinito, por eso se colocar el isUpdating 
  //   } else {
  //     this.addressForm.get('district_id')?.reset(); // Resetear el campo si está vacío
  //   }

  //   this.isUpdating = false; // Restablecer la bandera después de la actualización
  // }

  extraerInformacion(): void {

    if(this.ejecutarExtrerDatos){
      const texto = this.addressForm.get('references')?.value;

      // Extraer el nombre (primera coincidencia de tres palabras separadas por espacio o salto de línea)
      const nameMatch = texto.match(/(?:[^\n]+ ){2}[^\n]+/);
      // Extraer números de 8 dígitos (DNI)
      const numerosMatch = texto.match(/\b\d{8}\b/g);
      // Extraer teléfonos con formato peruano
      const telefonosMatch = texto.match(/\b(?:\+?51\s?)?(\d\s?){9}\b/g);
  
      // Limpiar el formato de los teléfonos (eliminar +51 y espacios)
      const telefonos = telefonosMatch ? telefonosMatch.map((numero:string) => numero.replace(/(\+51|\s)/g, '')) : [];
  
      // Asignar valores extraídos directamente al FormGroup
      this.addressForm.patchValue({
        dni: numerosMatch ? numerosMatch.join(', ') : '',
        phone: telefonos.length > 0 ? telefonos.join(', ') : '',
        name: nameMatch ? nameMatch[0] : ''
      });
  
      console.log('Datos extraidos');
      console.log('DNI:', this.addressForm.get('dni')?.value);
      console.log('Teléfono(s):', this.addressForm.get('phone')?.value);
      console.log('Nombre:', this.addressForm.get('name')?.value);
    }



  }


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
      this.addressForm.patchValue(value, { emitEvent: false }); //son los datos que enviare al form
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
