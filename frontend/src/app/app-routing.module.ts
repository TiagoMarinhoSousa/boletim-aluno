import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaComponent } from './modules/nota/nota.component'

const routes: Routes = [
  { path: '', redirectTo: 'notas', pathMatch: 'full' },
  { path: 'notas', component: NotaComponent }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
