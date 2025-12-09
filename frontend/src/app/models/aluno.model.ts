import { Turma } from './turma.model';

export interface Aluno {
  id: number;
  nome: string;
  turma: Turma; // Assumindo que o backend retorna a turma completa ou apenas o ID
}