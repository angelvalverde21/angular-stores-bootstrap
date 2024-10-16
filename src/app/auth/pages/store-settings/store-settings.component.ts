import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { LoadingCenterComponent } from "../../../components/loading-center/loading-center.component";
import { BreadCrumbComponent } from "../../shared/bread-crumb/bread-crumb.component";
import { CommonModule } from '@angular/common';
import { InputGroupComponent } from "../../../components/forms/input-group/input-group.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSaveComponent } from "../../../components/buttons/button-save/button-save.component";
import { StoreService } from '../../../services/store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-settings',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, BreadCrumbComponent, CommonModule, InputGroupComponent, ReactiveFormsModule, ButtonSaveComponent],
  templateUrl: './store-settings.component.html',
  styleUrl: './store-settings.component.css'
})
export class StoreSettingsComponent implements OnInit, OnDestroy{

  form!: FormGroup;
  loading: boolean = false;
  loadingEdit: boolean = false;
  btnActive: boolean = false;
  breadCrumbs: any;
  warehouses: any;
  store: string = "";
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _store: StoreService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.store = this._store.name()!;
    this.loadForm();
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }


  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      ruc: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      warehouse_id: ['', [Validators.required]],

    });
  }


  
  btnSaveReady() {
    this.btnActive = true;
    this.loadingEdit = false;
  }

  btnSaveBusy() {
    this.btnActive = false;
    this.loadingEdit = true;
  }

  save(){
    this.btnSaveBusy();

    console.log('form enviado');

    this.success = false;

    this._store.save(this.form.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        console.log('recibiendo los datos del store correctamente');
        Swal.fire('Guardado', 'Los datos de la empresa han sido actualizados', 'success');
        // this.product = resp.data; //Momentaneamente se ha bloqueado la respuesta para que no colicione con
        this.success = true;
        this.btnSaveReady();
      },
      error: (error: any) => {
        console.error(error);
        this.btnSaveReady();
      },
    });
  }

  private loadForm() {
    this.loading = true;

    this._store.show(this.store).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.loading = false;
        // this.store = resp.data;

        // this.product.colors.sort((a:any, b: any) => b.id - a.id);
        this.warehouses = resp.data.warehouses;
        this.form.patchValue(resp.data);
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener la informacion de la tienda',
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(error);
            
          }
        });
        // console.error('Error loading product:', error);
      },
    });
  }

}
