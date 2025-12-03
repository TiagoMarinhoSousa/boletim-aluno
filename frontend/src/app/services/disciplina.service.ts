import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Disciplina {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private apiUrl = 'http://localhost:8080/disciplinas';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}`);
  }

  buscarPorId(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  salvar(disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.post<Disciplina>(`${this.apiUrl}`, disciplina);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}