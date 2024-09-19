import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  @Input() icon: string = 'fa-solid fa-warehouse';
  @Input() buttonLabel: string = 'Dropdown';
  @Input() items: { label: string, value: any }[] = [];
  @Output() itemSelected = new EventEmitter<any>();

  onItemClick(item: { label: string, value: any }) {
    this.itemSelected.emit(item.value);
  }

}
