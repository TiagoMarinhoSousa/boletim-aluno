import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajuste os tipos conforme seus DTOs
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = 'http://localhost:8080/notas';

  constructor(private http: HttpClient) {}

  salvarEmLote(notas: Nota[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/lote`, notas);
  }
}