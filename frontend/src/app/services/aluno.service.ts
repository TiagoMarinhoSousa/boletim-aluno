import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/alunos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  listarNotasPorAluno(alunoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${alunoId}/notas`);
  }
}