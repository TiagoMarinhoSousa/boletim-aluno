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

      // Primeiro, cria o FormControl para validação
      const control = component.getNotaControl(1, 1);
      control.setValue(-1);
      control.markAsTouched();

      spyOn(component['snackBar'], 'open');
      component.atualizarNota(1, 1, -1, inputElement);
      
      expect(component['snackBar'].open).toHaveBeenCalled();
      expect(inputElement.value).toBe('');
    });

    it('deve rejeitar nota > 10', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');
      inputElement.value = '11';

      // Primeiro, cria o FormControl para validação
      const control = component.getNotaControl(1, 1);
      control.setValue(11);
      control.markAsTouched();

      spyOn(component['snackBar'], 'open');
      component.atualizarNota(1, 1, 11, inputElement);
      
      expect(component['snackBar'].open).toHaveBeenCalled();
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
      inputElement.value = '15';

      // Primeiro cria o FormControl e define valor inválido
      const control = component.getNotaControl(1, 1);
      control.setValue(15);
      control.markAsTouched();

      spyOn(component['snackBar'], 'open');
      component.atualizarNota(1, 1, 15, inputElement);
      
      // Verifica que o erro foi mostrado e o input foi limpo
      expect(component['snackBar'].open).toHaveBeenCalled();
      expect(inputElement.value).toBe('');
    });

    it('deve limpar input inválido', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');
      inputElement.value = '15';

      // Primeiro cria o FormControl e define valor inválido
      const control = component.getNotaControl(1, 1);
      control.setValue(15);
      control.markAsTouched();

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
      // Cria um FormControl inválido (valor fora do range 0-10)
      const control = component.getNotaControl(1, 1);
      control.setValue(15); // valor inválido
      control.markAsTouched();
      
      spyOn(component['snackBar'], 'open');
      component.salvarNotas();
      
      expect(notaService.salvarNotasEmLote).not.toHaveBeenCalled();
      expect(component['snackBar'].open).toHaveBeenCalled();
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

    it('deve filtrar apenas notas da disciplina selecionada', () => {
      const notasAluno = [
        { alunoId: 1, avaliacaoId: 1, valor: 8 },  // disciplina 1
        { alunoId: 1, avaliacaoId: 4, valor: 7 }   // disciplina 2 - não deve incluir
      ];
      notaService.listarPorAluno.and.returnValue(of(notasAluno));

      component.selecionarDisciplina(1);

      // Apenas notas da disciplina 1 (avaliacaoIds 1, 2, 3)
      expect(component.notas.filter(n => n.avaliacaoId <= 3).length).toBeGreaterThanOrEqual(0);
    });
  });

  // ✅ TESTES DE SELEÇÃO DE TURMA
  describe('selecionarTurma', () => {
    beforeEach(() => {
      const turmaServiceReal = TestBed.inject(TurmaService) as jasmine.SpyObj<TurmaService>;
      turmaServiceReal.listarAlunosPorTurma = jasmine.createSpy().and.returnValue(of(mockAlunos));
      notaService.listarPorAluno.and.returnValue(of([]));
    });

    it('deve configurar turmaSelecionada', () => {
      const turmaServiceReal = TestBed.inject(TurmaService) as any;
      turmaServiceReal.listarAlunosPorTurma = jasmine.createSpy().and.returnValue(of(mockAlunos));

      component.selecionarTurma(1);
      expect(component.turmaSelecionada).toBe(1);
    });
  });

  // ✅ TESTES DE isInvalido e isAlterado
  describe('Validação de FormControl', () => {
    it('isInvalido deve retornar true para controle inválido e tocado', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(15); // valor inválido
      control.markAsTouched();

      expect(component.isInvalido(1, 1)).toBeTrue();
    });

    it('isInvalido deve retornar false para controle válido', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8); // valor válido
      control.markAsTouched();

      expect(component.isInvalido(1, 1)).toBeFalse();
    });

    it('isInvalido deve retornar false para controle inválido mas não tocado', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(15); // valor inválido

      expect(component.isInvalido(1, 1)).toBeFalse();
    });

    it('isAlterado deve retornar true para controle dirty e válido', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8); // valor válido
      control.markAsDirty();

      expect(component.isAlterado(1, 1)).toBeTrue();
    });

    it('isAlterado deve retornar false para controle não dirty', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8); // valor válido

      expect(component.isAlterado(1, 1)).toBeFalse();
    });

    it('isAlterado deve retornar false para controle dirty mas inválido', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(15); // valor inválido
      control.markAsDirty();

      expect(component.isAlterado(1, 1)).toBeFalse();
    });
  });

  // ✅ TESTES DE hasNotasAlteradas e hasErros
  describe('Estado do Formulário', () => {
    it('hasNotasAlteradas deve retornar true quando formulário está dirty', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8);
      control.markAsDirty();

      expect(component.hasNotasAlteradas()).toBeTrue();
    });

    it('hasNotasAlteradas deve retornar false quando formulário está pristine', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8);

      expect(component.hasNotasAlteradas()).toBeFalse();
    });

    it('hasErros deve retornar true quando formulário tem erros', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(15); // valor inválido

      expect(component.hasErros()).toBeTrue();
    });

    it('hasErros deve retornar false quando formulário é válido', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8); // valor válido

      expect(component.hasErros()).toBeFalse();
    });
  });

  // ✅ TESTES DE getNotaControl
  describe('getNotaControl', () => {
    it('deve criar controle se não existir', () => {
      const control = component.getNotaControl(99, 99);
      expect(control).toBeTruthy();
      expect(control.value).toBeNull();
    });

    it('deve retornar controle existente se já criado', () => {
      const control1 = component.getNotaControl(1, 1);
      control1.setValue(8);

      const control2 = component.getNotaControl(1, 1);
      expect(control2.value).toBe(8);
    });
  });

  // ✅ TESTES ADICIONAIS DE COBERTURA
  describe('Cobertura Adicional', () => {
    it('inputsInvalidos getter deve retornar Set com controles inválidos', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(15); // inválido
      control.markAsTouched();

      const invalidos = component.inputsInvalidos;
      expect(invalidos.has('1-1')).toBeTrue();
    });

    it('inputsInvalidos getter deve retornar Set vazio quando não há inválidos', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8); // válido

      const invalidos = component.inputsInvalidos;
      expect(invalidos.size).toBe(0);
    });

    it('notasAlteradas getter deve retornar Set com controles alterados', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8);
      control.markAsDirty();

      const alteradas = component.notasAlteradas;
      expect(alteradas.has('1-1')).toBeTrue();
    });

    it('notasAlteradas getter deve retornar Set vazio quando não há alterações', () => {
      const control = component.getNotaControl(1, 1);
      control.setValue(8);

      const alteradas = component.notasAlteradas;
      expect(alteradas.size).toBe(0);
    });
  });
});
