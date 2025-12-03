import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajuste os tipos conforme seus DTOs
import { Turma } from '../models/turma.model';
import { RelatorioAlunoDTO } from '../models/relatorio-aluno.dto';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private apiUrl = 'http://localhost:8080/turmas';

  constructor(private http: HttpClient) {}

  listarTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }

  relatorio(id: number): Observable<RelatorioAlunoDTO[]> {
    return this.http.get<RelatorioAlunoDTO[]>(`${this.apiUrl}/${id}/relatorio`);
  }
}