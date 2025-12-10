import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlunoService } from './aluno.service';

describe('AlunoService', () => {
  let service: AlunoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/alunos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlunoService]
    });
    service = TestBed.inject(AlunoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Listar Todos', () => {
    it('deve fazer GET para /alunos', () => {
      service.listarTodos().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('deve retornar lista de alunos', () => {
      const alunos = [
        { id: 1, nome: 'João Silva', turma: { id: 1, nome: 'Turma A' } },
        { id: 2, nome: 'Maria Santos', turma: { id: 1, nome: 'Turma A' } }
      ];

      service.listarTodos().subscribe((result) => {
        expect(result).toEqual(alunos);
        expect(result.length).toBe(2);
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush(alunos);
    });
  });

  describe('Listar Notas por Aluno', () => {
    it('deve fazer GET para /alunos/{id}/notas', () => {
      const alunoId = 1;

      service.listarNotasPorAluno(alunoId).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${alunoId}/notas`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('deve retornar notas do aluno', () => {
      const alunoId = 1;
      const notas = [
        { alunoId: 1, avaliacaoId: 1, valor: 8 },
        { alunoId: 1, avaliacaoId: 2, valor: 7 }
      ];

      service.listarNotasPorAluno(alunoId).subscribe((result) => {
        expect(result).toEqual(notas);
        expect(result.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/${alunoId}/notas`);
      req.flush(notas);
    });
  });
});
