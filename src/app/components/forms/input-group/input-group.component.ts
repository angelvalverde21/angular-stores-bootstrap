import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-group.component.html',
})
export class InputGroupComponent implements OnInit {
  @Input() icon: string = '';
  @Input() icontext: string = '';
  @Input() col: string = '';
  iconHtml: string = "";
  isValid = false;


  ngOnInit(){

    this.isValid = (this.icontext === "" && this.icon ==="") ? false : true;

    if (this.icontext.length > 0) {
      this.iconHtml = `${this.icontext}`;
    } else {
      this.iconHtml = `<i class="${this.icon}"></i>`;
    }

    // console.log(this.icontext);
  }

}
