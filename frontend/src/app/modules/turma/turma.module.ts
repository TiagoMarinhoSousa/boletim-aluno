import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmaRoutingModule } from './turma-routing.module';
import { TurmaComponent } from './turma.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TurmaComponent
  ],
  imports: [
    CommonModule,
    TurmaRoutingModule,
    MatIconModule
  ]
})
export class TurmaModule { }
