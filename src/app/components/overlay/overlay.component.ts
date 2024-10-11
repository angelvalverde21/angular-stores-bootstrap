import { Component } from '@angular/core';
import { LoadingCenterComponent } from "../loading-center/loading-center.component";

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [LoadingCenterComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css'
})
export class OverlayComponent {

}
