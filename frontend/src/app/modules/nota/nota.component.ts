import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../models/aluno.model';
import { Avaliacao } from '../../models/avaliacao.model';
import { Nota } from '../../models/nota.model';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
})
export class NotaComponent implements OnInit {
  turmas: { id: number; nome: string }[] = [];
  disciplinas: { id: number; nome: string }[] = [];
  alunos: Aluno[] = [];
  avaliacoes: Avaliacao[] = [];
  notas: Nota[] = [];

  turmaSelecionada: number | null = null;
  disciplinaSelecionada: number | null = null;

  colunasTabela: string[] = ['aluno', 'media']; // inicial

  ngOnInit(): void {
    // Mock inicial de turmas e disciplinas
    this.turmas = [
      { id: 1, nome: 'Turma A' },
      { id: 2, nome: 'Turma B' },
    ];

    this.disciplinas = [
      { id: 1, nome: 'Matemática' },
      { id: 2, nome: 'Português' },
      { id: 3, nome: 'História' },
    ];
  }

  selecionarTurma(turmaId: number) {
    this.turmaSelecionada = turmaId;

    // Resetar disciplina ao trocar de turma
    this.disciplinaSelecionada = null;
    this.avaliacoes = [];
    this.notas = [];
    this.colunasTabela = ['aluno', 'media'];

    // Mock de alunos por turma
    if (turmaId === 1) {
      this.alunos = [
        { id: 1, nome: 'Ana' },
        { id: 2, nome: 'Pedro' },
      ];
    } else if (turmaId === 2) {
      this.alunos = [
        { id: 3, nome: 'Carla' },
        { id: 4, nome: 'Tadeu' },
      ];
    }
  }

  selecionarDisciplina(disciplinaId: number) {
    this.disciplinaSelecionada = disciplinaId;

    // Definir avaliações fixas
    this.avaliacoes = [
      { id: 1, nome: 'Prova', peso: 5, disciplinaId },
      { id: 2, nome: 'Trabalho', peso: 2, disciplinaId },
      { id: 3, nome: 'Atividade', peso: 1, disciplinaId },
    ];

    // Atualizar colunas da tabela com ids únicos
    this.colunasTabela = [
      'aluno',
      ...this.avaliacoes.map((a) => 'avaliacao-' + a.id),
      'media',
    ];

    // Mock de notas (exemplo simples)
    this.notas = [];
    this.alunos.forEach((aluno) => {
      this.avaliacoes.forEach((avaliacao) => {
        this.notas.push({
          alunoId: aluno.id,
          avaliacaoId: avaliacao.id,
          valor: Math.floor(Math.random() * 4) + 7, // notas aleatórias 7–10
        });
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
    console.log('Notas salvas:', this.notas);
  }
}
