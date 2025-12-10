import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TurmaService } from './turma.service';

describe('TurmaService', () => {
  let service: TurmaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/turmas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TurmaService]
    });
    service = TestBed.inject(TurmaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Listar Todas', () => {
    it('deve fazer GET para /turmas', () => {
      service.listarTodas().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('deve retornar lista de turmas', () => {
      const turmas = [
        { id: 1, nome: 'Turma A' },
        { id: 2, nome: 'Turma B' }
      ];

      service.listarTodas().subscribe((result) => {
        expect(result).toEqual(turmas);
        expect(result.length).toBe(2);
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush(turmas);
    });
  });

  describe('Listar Alunos por Turma', () => {
    it('deve fazer GET para /turmas/{id}/alunos', () => {
      const turmaId = 1;

      service.listarAlunosPorTurma(turmaId).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${turmaId}/alunos`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('deve retornar lista de alunos da turma', () => {
      const turmaId = 1;
      const alunos = [
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Santos' }
      ];

      service.listarAlunosPorTurma(turmaId).subscribe((result) => {
        expect(result).toEqual(alunos);
        expect(result.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/${turmaId}/alunos`);
      req.flush(alunos);
    });
  });
});
