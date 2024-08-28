import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from "../../components/accordion/accordion-item/accordion-item.component";
import { InputTextComponent } from "../../components/forms/input-text/input-text.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [HeaderComponent, CommonModule, AccordionItemComponent, InputTextComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {

  sections: any;
  form!: FormGroup;

  constructor(public fb: FormBuilder){

    this.form = this.fb.group({
      facebook: ['', [Validators.required]]
    });


  }

}
