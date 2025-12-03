import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajuste os tipos conforme seus DTOs
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/alunos';

  constructor(private http: HttpClient) {}

  listarPorTurma(turmaId: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/turma/${turmaId}`);
  }
}