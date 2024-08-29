import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-group',
  standalone: true,
  imports: [],
  templateUrl: './input-group.component.html',
})
export class InputGroupComponent implements OnInit {
  @Input() icon: string = '';
  @Input() icontext: string = '';
  @Input() col: string = '';
  iconHtml: string = "";

  ngOnInit(){
    if (this.icontext.length > 0) {
      this.iconHtml = `${this.icontext}`;
    } else {
      this.iconHtml = `<i class="${this.icon}"></i>`;
    }

    // console.log(this.icontext);
  }

}
