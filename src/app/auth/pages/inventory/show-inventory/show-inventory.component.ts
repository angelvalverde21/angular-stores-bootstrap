import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { InputGroupComponent } from "../../../../components/forms/input-group/input-group.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../../services/product.service';
import { ButtonSaveComponent } from '../../../../components/buttons/button-save/button-save.component';

@Component({
  selector: 'app-show-inventory',
  standalone: true,
  imports: [HeaderComponent, InputGroupComponent, CommonModule, ReactiveFormsModule, ButtonSaveComponent],
  templateUrl: './show-inventory.component.html',
  styleUrl: './show-inventory.component.css'
})
export class ShowInventoryComponent {

  form!: FormGroup;
  loading: boolean = false;
  btnActive: boolean = false;
  

  loadingData: boolean = false;
  dataReady: boolean = false;
  loadingSubmit: boolean = false;
  success: boolean = false;
  buttonSubmitActive: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private _product: ProductService,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    this.initForm();
    this.load();
  }

  private initForm():void{
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      body: [''],
      tags: ['']
    });
  }

  private load(){

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this._product.load(Number(id)).subscribe({
        next: (resp:any) => {
          this.form.patchValue(resp.data);
        },
        error: (error:any) => {
          console.error('Error loading product:', error);
        }
      });
    }

  }

  btnSaveReady(){
    this.btnActive = true;
    this.loading = false;
  }

  btnSaveBusy(){
    this.btnActive = false;
    this.loading = true;
  }

  save(){

    this.btnSaveBusy();

    console.log('form enviado');
    
    this._product.save(this.form.value).subscribe({
      next: (resp:any) => {
        this.btnSaveReady();
      },
      error: (error: any) => {
        console.error(error);
        this.btnSaveReady();
      }
    });

  }
  
}
// (resp:any) => {
//   this.btnActive = true;
//   this.loading = false;
//   this.buttonSubmitActive = false;
//   if (resp.success) {
//     this.success = true;
//   }
//   console.log(this.form.value);
// }
