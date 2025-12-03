import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma.service';
import { AlunoService } from '../../services/aluno.service';
import { NotaService } from '../../services/nota.service';
import { Turma } from '../../models/turma.model';
import { Aluno } from '../../models/aluno.model';
import { Avaliacao } from '../../models/avaliacao.model';
import { Nota } from '../../models/nota.model';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
})
export class NotaComponent implements OnInit {
  turmas: Turma[] = [];
  alunos: Aluno[] = [];
  avaliacoes: Avaliacao[] = [];
  notas: Nota[] = [];

  turmaSelecionada?: Turma;
  colunasTabela: string[] = [];

  constructor(
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private notaService: NotaService
  ) {}

  ngOnInit(): void {
    this.turmaService.listarTurmas().subscribe((t) => (this.turmas = t));
  }

  selecionarTurma(turma: Turma): void {
    this.turmaSelecionada = turma;

    this.alunoService
      .listarPorTurma(turma.id)
      .subscribe((a) => (this.alunos = a));

    // Exemplo de avaliações fixas (substitua por chamada real ao serviço)
    this.avaliacoes = [
      { id: 1, nome: 'Prova 1', peso: 2, disciplinaId: turma.id },
      { id: 2, nome: 'Trabalho', peso: 1, disciplinaId: turma.id },
      { id: 3, nome: 'Prova Final', peso: 3, disciplinaId: turma.id },
    ];

    this.colunasTabela = [
      'aluno',
      ...this.avaliacoes.map((a) => a.nome),
      'media',
    ];
  }

  atualizarNota(alunoId: number, avaliacaoId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = parseFloat(input.value);

    if (isNaN(valor)) return;

    const notaExistente = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );
    if (notaExistente) {
      notaExistente.valor = valor;
    } else {
      this.notas.push({ alunoId, avaliacaoId, valor });
    }
  }

  calcularMedia(alunoId: number): number {
    const notasAluno = this.notas.filter((n) => n.alunoId === alunoId);
    if (notasAluno.length === 0) return NaN;

    let somaPesos = 0;
    let somaNotas = 0;

    notasAluno.forEach((n) => {
      const avaliacao = this.avaliacoes.find((a) => a.id === n.avaliacaoId);
      if (avaliacao) {
        somaPesos += avaliacao.peso;
        somaNotas += n.valor * avaliacao.peso;
      }
    });

    return somaPesos > 0 ? somaNotas / somaPesos : NaN;
  }

  salvarNotas(): void {
    this.notaService.salvarEmLote(this.notas).subscribe(() => {
      alert('Notas salvas com sucesso!');
    });
  }
}
