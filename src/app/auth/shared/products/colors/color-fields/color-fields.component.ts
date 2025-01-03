import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonSaveComponent } from '../../../../../components/buttons/button-save/button-save.component';
import { InputGroupComponent } from '../../../../../components/forms/input-group/input-group.component';
import { ButtonSwitchComponent } from '../../../../../components/buttons/button-switch/button-switch.component';
import { ColorService } from '../../../../../services/color.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-color-fields',
  standalone: true,
  imports: [InputGroupComponent, ButtonSaveComponent, ReactiveFormsModule, CommonModule, ButtonSwitchComponent],
  templateUrl: './color-fields.component.html',
  styleUrl: './color-fields.component.css'
})
export class ColorFieldsComponent implements OnInit{


  @Output() titleToColor = new EventEmitter<string>();
  
  @Input() color: any; 
  form!: FormGroup;
  id: number = 0;

  loading: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  nameColor: string = "";
  
  constructor( 
    private fb: FormBuilder,
    private _color: ColorService
  ){}

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      status: [''],
    });
  }

  private loadForm() {
    this.form.patchValue(this.color);
  }

  ngOnInit(): void {

    // console.log(this.color);
    this.id = this.color.id; //se coloca aqui porque se necesita que la estructura se inicialice antes
    this.initForm(); //inicia el formulario
    this.loadForm();
    this.nameColor = this.form.get('name')?.value

  }

  save() {

    this.loading = true;

    console.log('form enviado');

    this.success = false;

    this._color.save(this.form.value, this.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.success = true;
        this.loading = false;
        Swal.fire('Actualizado', 'Se ha guardado las opciones del color', 'success');
        this.titleToColor.emit(resp.data.name);
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      },
    });

  }

  btnActiveToggle(event:any){

    console.log(this.nameColor);
    
    console.log(event.target.value);

    this.btnActive = (event.target.value != this.nameColor) ? true : false;
  }
}
