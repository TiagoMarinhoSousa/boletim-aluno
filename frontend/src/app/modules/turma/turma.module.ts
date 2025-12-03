import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmaRoutingModule } from './turma-routing.module';
import { TurmaComponent } from './turma.component';


@NgModule({
  declarations: [
    TurmaComponent
  ],
  imports: [
    CommonModule,
    TurmaRoutingModule
  ]
})
export class TurmaModule { }
