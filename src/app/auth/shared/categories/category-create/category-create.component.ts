import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { InputGroupComponent } from "../../../../components/forms/input-group/input-group.component";
import { CategorySelectComponent } from "../category-select/category-select.component";
import { ButtonSaveComponent } from "../../../../components/buttons/button-save/button-save.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ButtonSwitchComponent } from "../../../../components/buttons/button-switch/button-switch.component";

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [InputGroupComponent, CategorySelectComponent, ButtonSaveComponent, ReactiveFormsModule, CommonModule, ButtonSwitchComponent],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
  encapsulation: ViewEncapsulation.None

})
export class CategoryCreateComponent implements OnInit, OnDestroy {

  loadingEdit: boolean = false;
  form!: FormGroup;
  btnActive: boolean = false;
  success: boolean = false;
  categoryCreateSubscription!: Subscription;
  // @Output() emitCategoryCreated = new EventEmitter<boolean>();

  constructor(private _fb: FormBuilder, private _modal : NgbModal,config: NgbModalConfig, private _category : CategoryService){
    config.backdrop = 'static';
		config.keyboard = false;
  }
 
  private modalRef: NgbModalRef | null = null;

  ngOnInit(): void {
    this.initForm(); //inicial el formulario
  }

  private initForm(): void {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      has_color: [0, [Validators.required]],
      has_size: [0, [Validators.required]],
      category_id: [''],
    });
  }

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalRef = this._modal.open(content, { centered: true });
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

    this.categoryCreateSubscription = this._category.create(this.form.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
      
        console.log('recibiendo la categoria creada');
        Swal.fire('Creado', 'La categoria ha sido creada correctamente', 'success');

        if (this.modalRef) {
          this.modalRef.close('Save button');
          this.btnSaveReady();
          // this.emitCategoryCreated.emit(true);
          this._category.setNotifyCategoryCreate(true);
        }

        this.initForm();

        // this.product = resp.data; //Momentaneamente se ha bloqueado la respuesta para que no colicione con 
        this.success = true;

      },
      error: (error: any) => {
        Swal.fire('Error', 'Ha ocurrido un error interno', 'error');
        console.error(error);
        this.btnSaveReady();
      },
    });

    
  }

  selectCategory(category:any){
    this.form.get('category_id')?.setValue(category.id); 
  }

  changeColor(){

  }

  changeSize(){

  }
 
  ngOnDestroy(): void {
    if (this.categoryCreateSubscription) {
      this.categoryCreateSubscription.unsubscribe();
    }
  }
}
