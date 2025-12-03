export interface Nota {
  id?: number;
  valor: number; // nota entre 0 e 10
  alunoId: number;
  avaliacaoId: number;
}