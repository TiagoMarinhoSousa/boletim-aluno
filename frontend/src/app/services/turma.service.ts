import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma.model';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private apiUrl = 'http://localhost:8080/turmas';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.apiUrl}`);
  }

  listarAlunosPorTurma(turmaId: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/${turmaId}/alunos`);
  }
}