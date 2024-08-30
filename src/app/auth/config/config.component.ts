import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from "../../components/accordion/accordion-item/accordion-item.component";
import { InputTextComponent } from "../../components/forms/input-text/input-text.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupComponent } from "../../components/forms/input-group/input-group.component";
import { CardConfigComponent } from "../../components/forms/card-config/card-config.component";
import { OptionService } from '../../services/api/option.service';
import { domainValidator } from '../../validators/domain.validator';
import { ValidatorsService } from '../../services/validators.service';
import { UploadDropzoneComponent } from "../../components/upload-dropzone/upload-dropzone.component";

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [HeaderComponent, CommonModule, AccordionItemComponent, InputTextComponent, ReactiveFormsModule, InputGroupComponent, CardConfigComponent, UploadDropzoneComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {

  sections: any;
  form!: FormGroup;
  loadingData: boolean = false;
  loadingSubmit: boolean = false;
  success: boolean = false;
  buttonSubmitActive: boolean = false;

  constructor(
    public fb: FormBuilder, 
    private _option: OptionService,
    private _validators: ValidatorsService
  ){

    this.form = this.fb.group({
      facebook: [''],
      tiktok: [''],
      instagram: [''],
      title: ['', [Validators.required]],
      iniciales: [''],
      dominio: ['', [Validators.required, domainValidator]],
      ship_min: [''],
      whatsapp: [''],
    });

  }

  hasError(controlName: string, errorName: string): boolean {
    return this.form.get(controlName)?.hasError(errorName) ?? false;
  }

  ngOnInit(): void {
    this.loadingData = true;
    this.loadData();
  }

  loadData(): void {
    this._option.all().subscribe(
      resp => {
        this.loadingData = false;
        const formattedData = this.formatData(resp.data);
        this.form.patchValue(formattedData);
      }
    );
  }

  isValidField(field:string){
    return this._validators.isValidField(this.form, field);
  }

  formatData(data: any[]): any {
    // Transforma el array de objetos en un objeto de clave-valor para usar con patchValue
    const result: any = {};
    data.forEach(item => {
      result[item.name] = item.value || '';
    });
    return result;
  }

  test(){
    const tiktok = this.form.get('tiktok')?.value;
    console.log(tiktok);
  }


  enviarForm(){

    this.buttonSubmitActive = true;
    this.loadingSubmit = true;
    this.loadingData = true;
    this.success = false;

    console.log('form enviado');
    
    this._option.save(this.form.value).subscribe((resp:any) => {
      this.loadingSubmit = false;
      this.loadingData = false;
      this.buttonSubmitActive = false;
      if (resp.success) {
        this.success = true;
      }
      console.log(this.form.value);
    });
  }

}
