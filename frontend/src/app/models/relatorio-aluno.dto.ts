import { RelatorioDisciplinaDTO } from './relatorio-disciplina.dto';

export interface RelatorioAlunoDTO {
  alunoId: number;
  alunoNome: string;
  disciplinas: RelatorioDisciplinaDTO[];
}