import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';
import { AlunoComponent } from './aluno.component';


@NgModule({
  declarations: [
    AlunoComponent
  ],
  imports: [
    CommonModule,
    AlunoRoutingModule
  ]
})
export class AlunoModule { }
