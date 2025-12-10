import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TurmaService } from '../../services/turma.service';
import { AlunoService } from '../../services/aluno.service';
import { Turma } from '../../models/turma.model';
import { Aluno } from '../../models/aluno.model';
import { NotaService, NotaDTO } from '../../services/nota.service';
import { Avaliacao } from '../../models/avaliacao.model';
import { DisciplinaService, Disciplina } from '../../services/disciplina.service';
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

  // Formulário reativo para as notas
  notasForm: FormGroup = new FormGroup({});

  // Flag para mostrar loading
  carregando: boolean = false;

  colunasTabela: string[] = ['aluno', 'media'];

  constructor(
    private fb: FormBuilder,
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

  // Retorna a chave única para o FormControl de uma nota
  private getNotaKey(alunoId: number, avaliacaoId: number): string {
    return `${alunoId}-${avaliacaoId}`;
  }

  // Obtém o FormControl para uma nota específica
  getNotaControl(alunoId: number, avaliacaoId: number): FormControl {
    const key = this.getNotaKey(alunoId, avaliacaoId);
    if (!this.notasForm.contains(key)) {
      // Cria o controle se não existir (com validadores min/max)
      this.notasForm.addControl(
        key,
        new FormControl(null, [Validators.min(0), Validators.max(10)])
      );
    }
    return this.notasForm.get(key) as FormControl;
  }

  // Verifica se um controle está inválido
  isInvalido(alunoId: number, avaliacaoId: number): boolean {
    const control = this.getNotaControl(alunoId, avaliacaoId);
    return control.invalid && control.touched;
  }

  // Verifica se um controle foi alterado
  isAlterado(alunoId: number, avaliacaoId: number): boolean {
    const control = this.getNotaControl(alunoId, avaliacaoId);
    return control.dirty && control.valid;
  }

  // Recria o formulário quando muda a seleção
  private criarFormularioNotas(): void {
    this.notasForm = new FormGroup({});
    
    this.alunos.forEach((aluno) => {
      this.avaliacoes.forEach((avaliacao) => {
        const key = this.getNotaKey(aluno.id, avaliacao.id);
        const valorExistente = this.getNotaValorNumerico(aluno.id, avaliacao.id);
        
        this.notasForm.addControl(
          key,
          new FormControl(valorExistente, [Validators.min(0), Validators.max(10)])
        );
      });
    });
  }

  // Retorna valor numérico da nota ou null
  private getNotaValorNumerico(alunoId: number, avaliacaoId: number): number | null {
    const nota = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );
    return nota ? nota.valor : null;
  }

  getValorDoEvento(event: Event): number {
    const input = event.target as HTMLInputElement;
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

    // Buscar notas e depois criar o formulário
    this.notas = [];
    let alunosProcessados = 0;
    
    this.alunos.forEach((aluno) => {
      this.notaService.listarPorAluno(aluno.id).subscribe((notasAluno) => {
        notasAluno.forEach((n) => {
          if (avaliacaoIds.includes(n.avaliacaoId)) {
            this.notas.push(n);
          }
        });
        
        alunosProcessados++;
        // Quando todos os alunos forem processados, cria o formulário
        if (alunosProcessados === this.alunos.length) {
          this.criarFormularioNotas();
        }
      });
    });
  }

  getAvaliacaoIdsPorDisciplina(disciplinaId: number): number[] {
    const inicio = (disciplinaId - 1) * 3 + 1;
    return [inicio, inicio + 1, inicio + 2];
  }

  getNotaValor(alunoId: number, avaliacaoId: number): string {
    const nota = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );
    return nota ? nota.valor.toString() : '-';
  }

  // Atualiza nota usando Reactive Forms
  atualizarNota(alunoId: number, avaliacaoId: number, valor: number, inputElement?: HTMLInputElement): void {
    const control = this.getNotaControl(alunoId, avaliacaoId);
    control.markAsTouched();
    control.markAsDirty();

    // Se o input está vazio (NaN), limpa a nota
    if (isNaN(valor)) {
      control.setValue(null);
      // Remove nota do array se existir
      const index = this.notas.findIndex(
        (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
      );
      if (index !== -1) {
        this.notas.splice(index, 1);
        this.notas = [...this.notas];
      }
      return;
    }

    // Validação via Reactive Forms
    if (control.invalid) {
      this.snackBar.open('✗ O valor da nota deve estar entre 0 e 10.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-erro']
      });
      
      // Limpa o input
      if (inputElement) {
        inputElement.value = '';
      }
      control.setValue(null);
      return;
    }

    // Atualiza ou cria nota no array
    const notaExistente = this.notas.find(
      (n) => n.alunoId === alunoId && n.avaliacaoId === avaliacaoId
    );

    if (notaExistente) {
      notaExistente.valor = valor;
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

  // Verifica se há notas alteradas (dirty)
  hasNotasAlteradas(): boolean {
    return this.notasForm.dirty;
  }

  // Verifica se o formulário tem erros
  hasErros(): boolean {
    return this.notasForm.invalid;
  }

  salvarNotas() {
    // Verifica se há erros de validação no formulário
    if (this.notasForm.invalid) {
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
        this.carregando = false;
        
        // Marca o formulário como pristine (não alterado)
        this.notasForm.markAsPristine();

        this.snackBar.open('✓ Notas salvas com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-sucesso']
        });

        console.log('Notas salvas com sucesso!');
      },
      error: (erro) => {
        this.carregando = false;
        console.error('Erro ao salvar notas:', erro);
      }
    });
  }

  // ============================================
  // MÉTODOS DE COMPATIBILIDADE (para testes existentes)
  // ============================================
  
  // Compatibilidade: retorna Set de inputs inválidos
  get inputsInvalidos(): Set<string> {
    const invalidos = new Set<string>();
    Object.keys(this.notasForm.controls).forEach(key => {
      const control = this.notasForm.get(key);
      if (control && control.invalid && control.touched) {
        invalidos.add(key);
      }
    });
    return invalidos;
  }

  // Compatibilidade: retorna Set de notas alteradas
  get notasAlteradas(): Set<string> {
    const alteradas = new Set<string>();
    Object.keys(this.notasForm.controls).forEach(key => {
      const control = this.notasForm.get(key);
      if (control && control.dirty) {
        alteradas.add(key);
      }
    });
    return alteradas;
  }
}
