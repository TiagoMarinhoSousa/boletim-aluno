export interface Aluno {
  id: number;
  nome: string;
  turmaId?: number; // opcional, caso precise referenciar a turma
}