import { NgModule } from '@angular/core';
import { ShortTitlePipe } from './Pipes/short-title.pipe';
import { ShortNamePipe } from './Pipes/short-name.pipe';
import { PenPipe } from './Pipes/pen.pipe';



@NgModule({

  declarations: [
    ShortTitlePipe,
    ShortNamePipe,
    PenPipe,
  ],
  
  exports: [
    ShortTitlePipe,
    ShortNamePipe,
    PenPipe,
  ],

  imports: [
  ]
})

export class PipesModule { }
