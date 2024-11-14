import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Dropzone from 'dropzone';
// import { UpperFirstPipe } from '../../shared/Pipes/upper-first.pipe';
import { PipesModule } from '../../shared/pipes.module';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dropzone',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.css'
})
export class DropzoneComponent{

  dropzoneId: string = "";
  
}
