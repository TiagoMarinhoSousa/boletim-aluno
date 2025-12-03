import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma.service';
import { AlunoService } from '../../services/aluno.service';
import { NotaService, NotaDTO } from '../../services/nota.service';
import { Avaliacao } from '../../models/avaliacao.model';
import {
  DisciplinaService,
  Disciplina,
} from '../../services/disciplina.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
})
export class NotaComponent implements OnInit {
  turmas: any[] = [];
  disciplinas: Disciplina[] = [];
  alunos: any[] = [];
  avaliacoes: Avaliacao[] = [];
  notas: NotaDTO[] = [];

  turmaSelecionada: number | null = null;
  disciplinaSelecionada: number | null = null;

  colunasTabela: string[] = ['aluno', 'media'];

  constructor(
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private disciplinaService: DisciplinaService,
    private notaService: NotaService
  ) {}

  ngOnInit(): void {
    // Carregar turmas e disciplinas do backend
    this.turmaService
      .listarTodas()
      .subscribe((turmas) => (this.turmas = turmas));
    this.disciplinaService
      .listarTodas()
      .subscribe((disciplinas) => (this.disciplinas = disciplinas));
  }

  selecionarTurma(turmaId: number) {
    this.turmaSelecionada = turmaId;
    this.disciplinaSelecionada = null;
    this.avaliacoes = [];
    this.notas = [];
    this.colunasTabela = ['aluno', 'media'];

    // Buscar alunos da turma no backend
    this.turmaService.listarAlunosPorTurma(turmaId).subscribe((alunos) => {
      this.alunos = alunos;
    });
  }

  selecionarDisciplina(disciplinaId: number) {
    this.disciplinaSelecionada = disciplinaId;

    // Avaliações fixas (pode ser substituído futuramente por AvaliacaoController)
    this.avaliacoes = [
      { id: 1, nome: 'Prova', peso: 5, disciplinaId },
      { id: 2, nome: 'Trabalho', peso: 2, disciplinaId },
      { id: 3, nome: 'Atividade', peso: 1, disciplinaId },
    ];

    this.colunasTabela = [
      'aluno',
      ...this.avaliacoes.map((a) => 'avaliacao-' + a.id),
      'media',
    ];

    // Buscar notas de cada aluno no backend
    this.notas = [];
    this.alunos.forEach((aluno) => {
      this.alunoService
        .listarNotasPorAluno(aluno.id)
        .subscribe((notasAluno) => {
          notasAluno.forEach((n) => this.notas.push(n));
        });
    });
  }

  getNotaValor(alunoId: number, avaliacaoId: number): string {
    const nota = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );
    return nota ? nota.valor.toString() : '-';
  }

  atualizarNota(alunoId: number, avaliacaoId: number, event: any) {
    const valor = +event.target.value;
    let nota = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );

    if (nota) {
      nota.valor = valor;
    } else {
      this.notas.push({ alunoId, avaliacaoId, valor });
    }
  }

  calcularMedia(alunoId: number): string {
    const notasAluno = this.notas.filter((n) => n.alunoId === alunoId);
    let somaPesos = 0;
    let somaNotas = 0;

    notasAluno.forEach((n) => {
      const avaliacao = this.avaliacoes.find((a) => a.id === n.avaliacaoId);
      if (avaliacao) {
        somaPesos += avaliacao.peso;
        somaNotas += n.valor * avaliacao.peso;
      }
    });

    if (somaPesos > 0) {
      return (somaNotas / somaPesos).toFixed(1);
    }
    return '-';
  }

  salvarNotas() {
    this.notaService.salvarNotasEmLote(this.notas).subscribe(() => {
      console.log('Notas salvas com sucesso!');
    });
  }
}
