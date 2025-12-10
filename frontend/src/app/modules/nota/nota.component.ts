import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma.service';
import { AlunoService } from '../../services/aluno.service';
import { Turma } from '../../models/turma.model'; // Importar Turma
import { Aluno } from '../../models/aluno.model'; // Importar Aluno
import { NotaService, NotaDTO } from '../../services/nota.service';
import { Avaliacao } from '../../models/avaliacao.model';
import {
  DisciplinaService,
  Disciplina,
} from '../../services/disciplina.service'; // Remover importação de ErrorResponse
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
})
export class NotaComponent implements OnInit {
  turmas: Turma[] = [];
  disciplinas: Disciplina[] = [];
  alunos: Aluno[] = [];
  avaliacoes: Avaliacao[] = [];
  notas: NotaDTO[] = [];

  turmaSelecionada: number | null = null;
  disciplinaSelecionada: number | null = null;
  
  // Rastreia inputs com valores inválidos que foram resetados
  inputsInvalidos: Set<string> = new Set();
  
  // Rastreia notas que foram alteradas
  notasAlteradas: Set<string> = new Set();
  
  // Flag para mostrar loading
  carregando: boolean = false;

  colunasTabela: string[] = ['aluno', 'media'];

  constructor(
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private disciplinaService: DisciplinaService,
    private notaService: NotaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Carrega todas as turmas
    this.turmaService.listarTodas().subscribe((turmas) => {
      this.turmas = turmas;
    });

    // Carrega todas as disciplinas
    this.disciplinaService.listarTodas().subscribe((disciplinas) => {
      this.disciplinas = disciplinas;
    });
  }

  getValorDoEvento(event: Event): number {
    const input = event.target as HTMLInputElement;
    // Retorna NaN se input vazio ou se tiver "-"
    if (input.value === '' || input.value === '-') {
      return NaN;
    }
    return input.valueAsNumber;
  }
  selecionarTurma(turmaId: number): void {
    this.turmaSelecionada = turmaId;

    this.turmaService.listarAlunosPorTurma(turmaId).subscribe((alunos) => {
      this.alunos = alunos;
      this.notas = [];

      this.alunos.forEach((aluno) => {
        this.notaService.listarPorAluno(aluno.id).subscribe((notasAluno) => {
          notasAluno.forEach((nota) => this.notas.push(nota));
        });
      });
    });
  }

  selecionarDisciplina(disciplinaId: number) {
    this.disciplinaSelecionada = disciplinaId;

    // Avaliações da disciplina selecionada (IDs: 1-3 para disciplina 1, 4-6 para disciplina 2, etc)
    const avaliacaoIds = this.getAvaliacaoIdsPorDisciplina(disciplinaId);
    
    this.avaliacoes = [
      { id: avaliacaoIds[0], descricao: 'Prova', peso: 5, disciplinaId },
      { id: avaliacaoIds[1], descricao: 'Trabalho', peso: 2, disciplinaId },
      { id: avaliacaoIds[2], descricao: 'Atividade', peso: 1, disciplinaId },
    ];

    this.colunasTabela = [
      'aluno',
      ...this.avaliacoes.map((a) => 'avaliacao-' + a.id),
      'media',
    ];

    // Buscar notas de cada aluno no backend
    this.notas = [];
    this.alunos.forEach((aluno) => {
      this.notaService
        .listarPorAluno(aluno.id)
        .subscribe((notasAluno) => {
          // Filtrar apenas as notas da disciplina selecionada
          notasAluno.forEach((n) => {
            if (avaliacaoIds.includes(n.avaliacaoId)) {
              this.notas.push(n);
            }
          });
        });
    });
  }

  getAvaliacaoIdsPorDisciplina(disciplinaId: number): number[] {
    // Mapeamento: disciplina 1 -> avaliações 1-3, disciplina 2 -> avaliações 4-6, etc
    const inicio = (disciplinaId - 1) * 3 + 1;
    return [inicio, inicio + 1, inicio + 2];
  }

  getNotaValor(alunoId: number, avaliacaoId: number): string {
    const nota = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );
    return nota ? nota.valor.toString() : '-';
  }

  atualizarNota(alunoId: number, avaliacaoId: number, valor: number, inputElement?: HTMLInputElement): void {
    const chave = `${alunoId}-${avaliacaoId}`;
    
    // Se o input está vazio (NaN), permite remover a nota
    if (isNaN(valor)) {
      // Remove nota do array se existir
      const index = this.notas.findIndex(
        (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
      );
      if (index !== -1) {
        this.notas.splice(index, 1);
        this.notasAlteradas.add(chave);
        this.notas = [...this.notas];
      }
      // Remove da marcação de inválido
      this.inputsInvalidos.delete(chave);
      return;
    }

    // Validação: nota deve estar entre 0 e 10
    if (valor < 0 || valor > 10) {
      this.snackBar.open('✗ O valor da nota deve estar entre 0 e 10.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-erro']
      });
      // Marca como inválido
      this.inputsInvalidos.add(chave);
      // Remove nota inválida do array
      const index = this.notas.findIndex(
        (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
      );
      if (index !== -1) {
        this.notas.splice(index, 1);
      }
      // Limpa o input diretamente
      if (inputElement) {
        inputElement.value = '';
      }
      // Força detecção de mudança
      this.notas = [...this.notas];
      return;
    }

    // Se entrada for válida, remove da marcação de inválido
    this.inputsInvalidos.delete(chave);
    // Marca como alterado
    this.notasAlteradas.add(chave);

    // Buscar nota existente
    const notaExistente = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );

    if (notaExistente) {
      // Se existe, sobrescrever o valor
      notaExistente.valor = valor;
    } else {
      // Se não existe, criar nova nota
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
    // Verifica se há inputs inválidos pendentes
    if (this.inputsInvalidos.size > 0) {
      this.snackBar.open('✗ Existem campos com validação pendente. Corrija antes de salvar.', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-erro'],
      });
      return;
    }

    // Ativa loading
    this.carregando = true;

    this.notaService.salvarNotasEmLote(this.notas).subscribe({
      next: () => {
        // Desativa loading
        this.carregando = false;
        
        // Limpa rastreamento de alterações após salvar
        this.notasAlteradas.clear();
        
        // Mostra snackbar com sucesso
        this.snackBar.open('✓ Notas salvas com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-sucesso']
        });
        
        console.log('Notas salvas com sucesso!');
      },
      error: (erro) => {
        // Desativa loading
        this.carregando = false;
        // O ErrorInterceptor agora é responsável por mostrar o snackbar de erro.
        // Apenas logamos o erro no console para fins de debug.
        console.error('Erro ao salvar notas:', erro);
      }
    });
  }
}
