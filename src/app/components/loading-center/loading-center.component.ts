import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-center',
  standalone: true,
  imports: [],
  templateUrl: './loading-center.component.html',
  styleUrl: './loading-center.component.css'
})
export class LoadingCenterComponent {
  @Input() size: string = ""; 
}