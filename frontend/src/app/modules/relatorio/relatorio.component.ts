import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../models/aluno.model';
import { Avaliacao } from '../../models/avaliacao.model';
import { Nota } from '../../models/nota.model';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioComponent implements OnInit {
  alunos: Aluno[] = [];
  avaliacoes: Avaliacao[] = [];
  notas: Nota[] = [];

  ngOnInit(): void {
    // Mock de alunos
    this.alunos = [
      { id: 1, nome: 'Ana' },
      { id: 2, nome: 'Bruno' },
      { id: 3, nome: 'Carla' },
    ];

    // Mock de avaliações
    this.avaliacoes = [
      { id: 1, nome: 'Prova', peso: 5, disciplinaId: 1 },
      { id: 2, nome: 'Trabalho', peso: 2, disciplinaId: 1 },
      { id: 3, nome: 'Atividade', peso: 1, disciplinaId: 1 },
    ];

    // Mock de notas
    this.notas = [
      { alunoId: 1, avaliacaoId: 1, valor: 8 },
      { alunoId: 1, avaliacaoId: 2, valor: 6 },
      { alunoId: 1, avaliacaoId: 3, valor: 10 },

      { alunoId: 2, avaliacaoId: 1, valor: 7 },
      { alunoId: 2, avaliacaoId: 2, valor: 5 },
      { alunoId: 2, avaliacaoId: 3, valor: 8 },

      { alunoId: 3, avaliacaoId: 1, valor: 9 },
      { alunoId: 3, avaliacaoId: 2, valor: 7 },
      { alunoId: 3, avaliacaoId: 3, valor: 9 },
    ];
  }

  calcularMediaAluno(alunoId: number): number {
    const notasAluno = this.notas.filter(n => n.alunoId === alunoId);
    let somaPesos = 0;
    let somaNotas = 0;

    notasAluno.forEach(n => {
      const avaliacao = this.avaliacoes.find(a => a.id === n.avaliacaoId);
      if (avaliacao) {
        somaPesos += avaliacao.peso;
        somaNotas += n.valor * avaliacao.peso;
      }
    });

    return somaPesos > 0 ? +(somaNotas / somaPesos).toFixed(1) : NaN;
  }

  calcularMediaAvaliacao(avaliacaoId: number): number {
    const notasAvaliacao = this.notas.filter(n => n.avaliacaoId === avaliacaoId);
    if (notasAvaliacao.length === 0) return NaN;

    const soma = notasAvaliacao.reduce((acc, n) => acc + n.valor, 0);
    return +(soma / notasAvaliacao.length).toFixed(1);
  }
}