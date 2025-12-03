import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotaDTO {
  alunoId: number;
  avaliacaoId: number;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = 'http://localhost:8080/notas'; // base do controller

  constructor(private http: HttpClient) {}

  salvarNota(nota: NotaDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, nota);
  }

  salvarNotasEmLote(notas: NotaDTO[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/lote`, notas);
  }

  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  listarPorAluno(alunoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/aluno/${alunoId}`);
  }

  calcularMediaPorAluno(alunoId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/aluno/${alunoId}/media-ponderada`);
  }

  listarBoletimPorAluno(alunoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/aluno/${alunoId}/boletim`);
  }

  calcularMediaPorDisciplina(disciplinaId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/disciplina/${disciplinaId}/media-ponderada`);
  }
}