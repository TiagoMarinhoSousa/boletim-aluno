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
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Santos' }
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

      spyOn(window, 'alert');
      component.atualizarNota(1, 1, -1, inputElement);
      
      expect(window.alert).toHaveBeenCalledWith('Nota deve estar entre 0 e 10');
      expect(component.inputsInvalidos.has('1-1')).toBeTrue();
      expect(inputElement.value).toBe('');
    });

    it('deve rejeitar nota > 10', () => {
      component.avaliacoes = mockAvaliacoes;
      const inputElement = document.createElement('input');
      inputElement.value = '11';

      spyOn(window, 'alert');
      component.atualizarNota(1, 1, 11, inputElement);
      
      expect(window.alert).toHaveBeenCalledWith('Nota deve estar entre 0 e 10');
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

      spyOn(component['snackBar'], 'open');
      component.salvarNotas();

      setTimeout(() => {
        expect(component['snackBar'].open).toHaveBeenCalled();
        done();
      }, 100);
    });
  });
});
