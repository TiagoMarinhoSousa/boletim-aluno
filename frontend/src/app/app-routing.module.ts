import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaComponent } from './modules/nota/nota.component'

const routes: Routes = [
  { path: 'notas', loadChildren: () => import('./modules/nota/nota.module').then(m => m.NotaModule) },
  { path: 'aluno', loadChildren: () => import('./modules/aluno/aluno.module').then(m => m.AlunoModule) },
  { path: 'relatorio', loadChildren: () => import('./modules/relatorio/relatorio.module').then(m => m.RelatorioModule) },
  { path: '', redirectTo: '/notas', pathMatch: 'full' }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
