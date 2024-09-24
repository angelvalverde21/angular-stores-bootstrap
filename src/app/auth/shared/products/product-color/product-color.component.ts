import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { InputGroupComponent } from "../../../../components/forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../../../../components/buttons/button-save/button-save.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from '../../../../services/color.service';
import { ButtonSwitchComponent } from "../../../../components/buttons/button-switch/button-switch.component";
import { ProductColorSizeComponent } from "../product-color-size/product-color-size.component";

@Component({
  selector: 'app-product-color',
  standalone: true,
  imports: [InputGroupComponent, ButtonSaveComponent, ReactiveFormsModule, CommonModule, ButtonSwitchComponent, ProductColorSizeComponent],
  templateUrl: './product-color.component.html',
  styleUrl: './product-color.component.css'
})
export class ProductColorComponent implements OnInit{

  @Input() color: any; 
  form!: FormGroup;
  id: number = 0;

  loading: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _color: ColorService
  ){

  }

  ngOnInit(): void {
    console.log(this.color);
    
    this.id = this.color.id; //se coloca aqui porque se necesita que la estructura se inicialice antes
    this.initForm(); //inicial el formulario
    this.loadForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      status: [''],
    });
  }

  private loadForm() {
    this.form.patchValue(this.color);
  }

  btnSaveReady() {
    this.btnActive = true;
    this.loading = false;
  }

  btnSaveBusy() {
    this.btnActive = false;
    this.loading = true;
  }

  save() {

    this.btnSaveBusy();

    console.log('form enviado');

    this.success = false;

    this._color.save(this.form.value, this.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.success = true;
        this.btnSaveReady();
      },
      error: (error: any) => {
        console.error(error);
        this.btnSaveReady();
      },
    });
  }
}
