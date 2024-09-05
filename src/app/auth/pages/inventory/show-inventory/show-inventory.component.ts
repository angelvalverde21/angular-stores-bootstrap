import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { InputGroupComponent } from '../../../../components/forms/input-group/input-group.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../../services/product.service';
import { ButtonSaveComponent } from '../../../../components/buttons/button-save/button-save.component';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { AlertComponent } from '../../../../components/alerts/alert/alert.component';
import { PipesModule } from '../../../../shared/pipes.module';
import { ColorComponent } from "../../../shared/color/color.component";

@Component({
  selector: 'app-show-inventory',
  standalone: true,
  imports: [
    HeaderComponent,
    InputGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonSaveComponent,
    LoadingComponent,
    AlertComponent,
    PipesModule,
    ColorComponent
],
  templateUrl: './show-inventory.component.html',
  styleUrl: './show-inventory.component.css',
})
export class ShowInventoryComponent {
  form!: FormGroup;
  loading: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  id: number = 0;
  colors: any;

  constructor(
    private fb: FormBuilder,
    private _product: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm(); //inicial el formulario
    this.loadForm(); //carga el formulario
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      body: [''],
      tags: [''],
      colors_active: this.fb.array([]),
    });
  }

  private loadForm() {
    this.loading = true;

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this._product.load(this.id).subscribe({
        next: (resp: any) => {
          console.log(resp.data.colors_active);

          this.colors = resp.data.colors_active;
          this.loading = false;
          this.form.patchValue(resp.data);
        },
        error: (error: any) => {
          console.error('Error loading product:', error);
        },
      });
    }
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

    this._product.save(this.form.value, this.id).subscribe({
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

  getTotalQuantity(sizes: { pivot: { quantity: number } }[]): number {
    return sizes.reduce((acc, size) => acc + size.pivot.quantity, 0);
  }

  updateQuantity(color_size_id: number, $event: any){
    console.log($event);
    console.log(color_size_id);
  }
}
// (resp:any) => {
//   this.btnActive = true;
//   this.loading = false;
//   this.buttonSubmitActive = false;git
//   if (resp.success) {
//     this.success = true;
//   }
//   console.log(this.form.value);
// }
