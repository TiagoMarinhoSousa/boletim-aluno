import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotaService } from './nota.service';

describe('NotaService', () => {
  let service: NotaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/notas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotaService]
    });
    service = TestBed.inject(NotaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Salvar Nota em Lote', () => {
    it('deve fazer POST para /notas/lote', () => {
      const notas = [
        { alunoId: 1, avaliacaoId: 1, valor: 8 },
        { alunoId: 1, avaliacaoId: 2, valor: 7 }
      ];

      service.salvarNotasEmLote(notas).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/lote`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(notas);
    });

    it('deve retornar notas salvas', () => {
      const notas = [{ alunoId: 1, avaliacaoId: 1, valor: 8 }];
      const response = [{ id: 1, aluno: { id: 1 }, avaliacao: { id: 1 }, valor: 8 }];

      service.salvarNotasEmLote(notas).subscribe((result) => {
        expect(result).toEqual(response);
      });

      const req = httpMock.expectOne(`${apiUrl}/lote`);
      req.flush(response);
    });
  });

  describe('Listar Notas por Aluno', () => {
    it('deve fazer GET para /notas/aluno/{id}', () => {
      const alunoId = 1;

      service.listarPorAluno(alunoId).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/aluno/${alunoId}`);
      expect(req.request.method).toBe('GET');
    });

    it('deve retornar notas do aluno', () => {
      const alunoId = 1;
      const notas = [
        { alunoId: 1, avaliacaoId: 1, valor: 8 },
        { alunoId: 1, avaliacaoId: 2, valor: 7 }
      ];

      service.listarPorAluno(alunoId).subscribe((result) => {
        expect(result).toEqual(notas);
      });

      const req = httpMock.expectOne(`${apiUrl}/aluno/${alunoId}`);
      req.flush(notas);
    });
  });

  describe('Calcular Média por Aluno', () => {
    it('deve fazer GET para /notas/aluno/{id}/media-ponderada', () => {
      const alunoId = 1;

      service.calcularMediaPorAluno(alunoId).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/aluno/${alunoId}/media-ponderada`);
      expect(req.request.method).toBe('GET');
    });

    it('deve retornar média ponderada', () => {
      const alunoId = 1;
      const media = 7.6;

      service.calcularMediaPorAluno(alunoId).subscribe((result) => {
        expect(result).toBe(media);
      });

      const req = httpMock.expectOne(`${apiUrl}/aluno/${alunoId}/media-ponderada`);
      req.flush(media);
    });
  });
});
