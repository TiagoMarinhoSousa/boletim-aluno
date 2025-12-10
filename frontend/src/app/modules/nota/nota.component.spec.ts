import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotaComponent } from './nota.component';
import { NotaService } from '../../services/nota.service';
import { TurmaService } from '../../services/turma.service';
import { DisciplinaService } from '../../services/disciplina.service';
import { AlunoService } from '../../services/aluno.service';
import { of, throwError } from 'rxjs';

describe('NotaComponent', () => {
  let component: NotaComponent;
  let fixture: ComponentFixture<NotaComponent>;
  let notaService: jasmine.SpyObj<NotaService>;
  let turmaService: jasmine.SpyObj<TurmaService>;
  let disciplinaService: jasmine.SpyObj<DisciplinaService>;

  const mockTurmas = [
    { id: 1, nome: 'Turma A' },
    { id: 2, nome: 'Turma B' }
  ];

  const mockDisciplinas = [
    { id: 1, nome: 'Matemática' },
    { id: 2, nome: 'Português' }
  ];

  const mockAlunos = [
    { id: 1, nome: 'João Silva', turma: { id: 1, nome: 'Turma A' } },
    { id: 2, nome: 'Maria Santos', turma: { id: 1, nome: 'Turma A' } }
  ];

  const mockAvaliacoes = [
    { id: 1, nome: 'Prova 1', peso: 5, descricao: 'Prova 1', disciplinaId: 1 },
    { id: 2, nome: 'Trabalho 1', peso: 2, descricao: 'Trabalho 1', disciplinaId: 1 },
    { id: 3, nome: 'Atividade 1', peso: 1, descricao: 'Atividade 1', disciplinaId: 1 },
    { id: 4, nome: 'Prova 2', peso: 5, descricao: 'Prova 2', disciplinaId: 2 },
    { id: 5, nome: 'Trabalho 2', peso: 2, descricao: 'Trabalho 2', disciplinaId: 2 },
    { id: 6, nome: 'Atividade 2', peso: 1, descricao: 'Atividade 2', disciplinaId: 2 }
  ];

  beforeEach(async () => {
    const notaServiceSpy = jasmine.createSpyObj('NotaService', [
      'salvarNotasEmLote',
      'listarPorAluno',
      'calcularMediaPorAluno'
    ]);
    const turmaServiceSpy = jasmine.createSpyObj('TurmaService', ['listarTodas']);
    const disciplinaServiceSpy = jasmine.createSpyObj('DisciplinaService', ['listarTodas']);
    const alunoServiceSpy = jasmine.createSpyObj('AlunoService', ['listarPorTurma']);

    await TestBed.configureTestingModule({
      declarations: [NotaComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTableModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: NotaService, useValue: notaServiceSpy },
        { provide: TurmaService, useValue: turmaServiceSpy },
        { provide: DisciplinaService, useValue: disciplinaServiceSpy },
        { provide: AlunoService, useValue: alunoServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    notaService = TestBed.inject(NotaService) as jasmine.SpyObj<NotaService>;
    turmaService = TestBed.inject(TurmaService) as jasmine.SpyObj<TurmaService>;
    disciplinaService = TestBed.inject(DisciplinaService) as jasmine.SpyObj<DisciplinaService>;

    turmaService.listarTodas.and.returnValue(of(mockTurmas));
    disciplinaService.listarTodas.and.returnValue(of(mockDisciplinas));

    fixture = TestBed.createComponent(NotaComponent);
    component = fixture.componentInstance;
  });;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ TESTES DE VALIDAÇÃO
  describe('Validação de Notas', () => {
    it('deve validar nota entre 0 e 10', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');
      
      // Nota válida
      spyOn(window, 'alert');
      component.atualizarNota(1, 1, 7.5, inputElement);
      expect(window.alert).not.toHaveBeenCalled();
      expect(component.inputsInvalidos.has('1-1')).toBeFalse();
    });

    it('deve rejeitar nota < 0', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');
      inputElement.value = '-1';

      spyOn(component['snackBar'], 'open');
      component.atualizarNota(1, 1, -1, inputElement);
      
      expect(component['snackBar'].open).toHaveBeenCalled();
      expect(component.inputsInvalidos.has('1-1')).toBeTrue();
      expect(inputElement.value).toBe('');
    });

    it('deve rejeitar nota > 10', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');
      inputElement.value = '11';

      spyOn(component['snackBar'], 'open');
      component.atualizarNota(1, 1, 11, inputElement);
      
      expect(component['snackBar'].open).toHaveBeenCalled();
      expect(component.inputsInvalidos.has('1-1')).toBeTrue();
      expect(inputElement.value).toBe('');
    });

    it('deve permitir input vazio (NaN)', () => {
      component.avaliacoes = mockAvaliacoes;
      component.notas = [{ alunoId: 1, avaliacaoId: 1, valor: 8 }];

      component.atualizarNota(1, 1, NaN);
      
      expect(component.notas.length).toBe(0);
      expect(component.inputsInvalidos.has('1-1')).toBeFalse();
    });

    it('deve aceitar nota = 0', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');

      spyOn(window, 'alert');
      component.atualizarNota(1, 1, 0, inputElement);
      
      expect(window.alert).not.toHaveBeenCalled();
      expect(component.inputsInvalidos.has('1-1')).toBeFalse();
    });

    it('deve aceitar nota = 10', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');

      spyOn(window, 'alert');
      component.atualizarNota(1, 1, 10, inputElement);
      
      expect(window.alert).not.toHaveBeenCalled();
      expect(component.inputsInvalidos.has('1-1')).toBeFalse();
    });
  });

  // ✅ TESTES DE CÁLCULO DE MÉDIA
  describe('Cálculo de Média Ponderada', () => {
    beforeEach(() => {
      component.avaliacoes = mockAvaliacoes;
    });

    it('deve calcular média com múltiplas notas e pesos', () => {
      component.notas = [
        { alunoId: 1, avaliacaoId: 1, valor: 8 },    // Prova: 8 * 5 = 40
        { alunoId: 1, avaliacaoId: 2, valor: 6 },    // Trabalho: 6 * 2 = 12
        { alunoId: 1, avaliacaoId: 3, valor: 9 }     // Atividade: 9 * 1 = 9
      ];

      const media = component.calcularMedia(1);
      // (40 + 12 + 9) / (5 + 2 + 1) = 61 / 8 = 7.625 → 7.6
      expect(media).toBe('7.6');
    });

    it('deve retornar "-" quando aluno sem notas', () => {
      component.notas = [];
      const media = component.calcularMedia(1);
      expect(media).toBe('-');
    });

    it('deve calcular média com uma única nota', () => {
      component.notas = [{ alunoId: 1, avaliacaoId: 1, valor: 8 }];
      const media = component.calcularMedia(1);
      expect(media).toBe('8.0');
    });

    it('deve calcular média com notas iguais', () => {
      component.notas = [
        { alunoId: 1, avaliacaoId: 1, valor: 7 },
        { alunoId: 1, avaliacaoId: 2, valor: 7 },
        { alunoId: 1, avaliacaoId: 3, valor: 7 }
      ];
      const media = component.calcularMedia(1);
      expect(media).toBe('7.0');
    });

    it('deve calcular média com notas extremas', () => {
      component.notas = [
        { alunoId: 1, avaliacaoId: 1, valor: 0 },    // Prova: 0 * 5 = 0
        { alunoId: 1, avaliacaoId: 2, valor: 10 }    // Trabalho: 10 * 2 = 20
      ];
      const media = component.calcularMedia(1);
      // (0 + 20) / (5 + 2) = 20 / 7 = 2.857... → 2.9
      expect(media).toBe('2.9');
    });
  });

  // ✅ TESTES DE ESTADO
  describe('Rastreamento de Estado', () => {
    it('deve rastrear notas alteradas', () => {
      component.avaliacoes = mockAvaliacoes;
      component.notas = [];

      component.atualizarNota(1, 1, 8);
      
      expect(component.notasAlteradas.has('1-1')).toBeTrue();
    });

    it('deve rastrear inputs inválidos', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');

      component.atualizarNota(1, 1, 15, inputElement);
      
      expect(component.inputsInvalidos.has('1-1')).toBeTrue();
    });

    it('deve limpar input inválido', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');
      inputElement.value = '15';

      component.atualizarNota(1, 1, 15, inputElement);
      
      expect(inputElement.value).toBe('');
    });

    it('deve fazer upsert de notas', () => {
      component.avaliacoes = mockAvaliacoes;
      component.notas = [];

      // Criar
      component.atualizarNota(1, 1, 8);
      expect(component.notas.length).toBe(1);
      expect(component.notas[0].valor).toBe(8);

      // Atualizar
      component.atualizarNota(1, 1, 9);
      expect(component.notas.length).toBe(1);
      expect(component.notas[0].valor).toBe(9);
    });
  });

  // ✅ TESTES DE SALVAMENTO
  describe('Salvamento de Notas', () => {
    beforeEach(() => {
      component.avaliacoes = mockAvaliacoes;
      notaService.salvarNotasEmLote.and.returnValue(of([]));
    });

    it('não deve salvar se há inputs inválidos', () => {
      component.inputsInvalidos.add('1-1');
      
      component.salvarNotas();
      
      expect(notaService.salvarNotasEmLote).not.toHaveBeenCalled();
    });

    it('deve salvar se todos os dados são válidos', () => {
      component.inputsInvalidos.clear();
      component.notas = [{ alunoId: 1, avaliacaoId: 1, valor: 8 }];

      component.salvarNotas();
      
      expect(notaService.salvarNotasEmLote).toHaveBeenCalledWith(component.notas);
    });

    it('deve lidar com erro ao salvar', (done) => {
      component.notas = [{ alunoId: 1, avaliacaoId: 1, valor: 8 }];
      notaService.salvarNotasEmLote.and.returnValue(
        throwError(() => ({ error: { message: 'Erro ao salvar' } }))
      );

      spyOn(console, 'error');
      component.salvarNotas();

      setTimeout(() => {
        expect(console.error).toHaveBeenCalled();
        expect(component.carregando).toBeFalse();
        done();
      }, 100);
    });

    it('deve limpar notasAlteradas e mostrar snackbar ao salvar com sucesso', (done) => {
      component.notas = [{ alunoId: 1, avaliacaoId: 1, valor: 8 }];
      component.notasAlteradas.add('1-1');

      spyOn(component['snackBar'], 'open');
      spyOn(console, 'log');
      component.salvarNotas();

      setTimeout(() => {
        expect(component.notasAlteradas.size).toBe(0);
        expect(component['snackBar'].open).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('Notas salvas com sucesso!');
        expect(component.carregando).toBeFalse();
        done();
      }, 100);
    });
  });

  // ✅ TESTES DE INICIALIZAÇÃO
  describe('Inicialização (ngOnInit)', () => {
    it('deve carregar turmas e disciplinas no ngOnInit', () => {
      fixture.detectChanges(); // Dispara ngOnInit

      expect(turmaService.listarTodas).toHaveBeenCalled();
      expect(disciplinaService.listarTodas).toHaveBeenCalled();
      expect(component.turmas).toEqual(mockTurmas);
      expect(component.disciplinas).toEqual(mockDisciplinas);
    });
  });

  // ✅ TESTES DE PARSING DE INPUT
  describe('getValorDoEvento', () => {
    it('deve retornar valor numérico para input válido', () => {
      const event = { target: { value: '8.5', valueAsNumber: 8.5 } } as unknown as Event;
      const resultado = component.getValorDoEvento(event);
      expect(resultado).toBe(8.5);
    });

    it('deve retornar NaN para input vazio', () => {
      const event = { target: { value: '', valueAsNumber: NaN } } as unknown as Event;
      const resultado = component.getValorDoEvento(event);
      expect(resultado).toBeNaN();
    });

    it('deve retornar NaN para input com hífen', () => {
      const event = { target: { value: '-', valueAsNumber: NaN } } as unknown as Event;
      const resultado = component.getValorDoEvento(event);
      expect(resultado).toBeNaN();
    });
  });

  // ✅ TESTES DE MAPEAMENTO DE AVALIAÇÕES
  describe('getAvaliacaoIdsPorDisciplina', () => {
    it('deve retornar IDs 1-3 para disciplina 1', () => {
      const ids = component.getAvaliacaoIdsPorDisciplina(1);
      expect(ids).toEqual([1, 2, 3]);
    });

    it('deve retornar IDs 4-6 para disciplina 2', () => {
      const ids = component.getAvaliacaoIdsPorDisciplina(2);
      expect(ids).toEqual([4, 5, 6]);
    });

    it('deve retornar IDs 7-9 para disciplina 3', () => {
      const ids = component.getAvaliacaoIdsPorDisciplina(3);
      expect(ids).toEqual([7, 8, 9]);
    });
  });

  // ✅ TESTES DE OBTENÇÃO DE VALOR DE NOTA
  describe('getNotaValor', () => {
    it('deve retornar valor da nota existente', () => {
      component.notas = [{ alunoId: 1, avaliacaoId: 1, valor: 8.5 }];
      const valor = component.getNotaValor(1, 1);
      expect(valor).toBe('8.5');
    });

    it('deve retornar "-" para nota inexistente', () => {
      component.notas = [];
      const valor = component.getNotaValor(1, 1);
      expect(valor).toBe('-');
    });

    it('deve retornar valor correto para aluno específico', () => {
      component.notas = [
        { alunoId: 1, avaliacaoId: 1, valor: 8 },
        { alunoId: 2, avaliacaoId: 1, valor: 7 }
      ];
      expect(component.getNotaValor(1, 1)).toBe('8');
      expect(component.getNotaValor(2, 1)).toBe('7');
    });
  });

  // ✅ TESTES DE SELEÇÃO DE DISCIPLINA
  describe('selecionarDisciplina', () => {
    beforeEach(() => {
      component.alunos = mockAlunos;
      notaService.listarPorAluno.and.returnValue(of([]));
    });

    it('deve configurar disciplinaSelecionada', () => {
      component.selecionarDisciplina(1);
      expect(component.disciplinaSelecionada).toBe(1);
    });

    it('deve configurar avaliações para disciplina selecionada', () => {
      component.selecionarDisciplina(1);
      expect(component.avaliacoes.length).toBe(3);
      expect(component.avaliacoes[0].descricao).toBe('Prova');
      expect(component.avaliacoes[1].descricao).toBe('Trabalho');
      expect(component.avaliacoes[2].descricao).toBe('Atividade');
    });

    it('deve atualizar colunas da tabela', () => {
      component.selecionarDisciplina(1);
      expect(component.colunasTabela).toContain('aluno');
      expect(component.colunasTabela).toContain('media');
      expect(component.colunasTabela.length).toBe(5);
    });

    it('deve buscar notas para cada aluno', () => {
      component.selecionarDisciplina(1);
      expect(notaService.listarPorAluno).toHaveBeenCalledTimes(2);
    });
  });
});
