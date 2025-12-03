import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaComponent } from './modules/nota/nota.component'
import { TurmaComponent } from './modules/turma/turma.component';
import { DisciplinaComponent } from './modules/disciplina/disciplina.component';

const routes: Routes = [
  { path: 'notas', component: NotaComponent },
  { path: 'turmas', component: TurmaComponent },
  { path: 'disciplinas', component: DisciplinaComponent },
  { path: '', redirectTo: '/notas', pathMatch: 'full' }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
