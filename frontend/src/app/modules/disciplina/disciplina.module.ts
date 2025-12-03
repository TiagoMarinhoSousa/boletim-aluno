import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinaComponent } from './disciplina.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DisciplinaComponent],
  imports: [CommonModule, MatIconModule]
})
export class DisciplinaModule { }
