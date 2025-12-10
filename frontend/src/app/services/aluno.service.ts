import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';
import { NotaDTO } from './nota.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/alunos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}`);
  }

  listarNotasPorAluno(alunoId: number): Observable<NotaDTO[]> {
    return this.http.get<NotaDTO[]>(`${this.apiUrl}/${alunoId}/notas`);
  }
}