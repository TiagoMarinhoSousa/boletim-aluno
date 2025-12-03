import { Disciplina } from './disciplina.model';

export interface Turma {
  id: number;
  nome: string;
  disciplinas?: Disciplina[]; // opcional
}