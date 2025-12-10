import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DisciplinaService, Disciplina } from './disciplina.service';

describe('DisciplinaService', () => {
  let service: DisciplinaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/disciplinas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DisciplinaService]
    });
    service = TestBed.inject(DisciplinaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Listar Todas', () => {
    it('deve fazer GET para /disciplinas', () => {
      service.listarTodas().subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('deve retornar lista de disciplinas', () => {
      const disciplinas: Disciplina[] = [
        { id: 1, nome: 'Matemática' },
        { id: 2, nome: 'Português' }
      ];

      service.listarTodas().subscribe((result) => {
        expect(result).toEqual(disciplinas);
        expect(result.length).toBe(2);
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush(disciplinas);
    });
  });

  describe('Buscar por ID', () => {
    it('deve fazer GET para /disciplinas/{id}', () => {
      const disciplinaId = 1;

      service.buscarPorId(disciplinaId).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${disciplinaId}`);
      expect(req.request.method).toBe('GET');
      req.flush({ id: 1, nome: 'Matemática' });
    });

    it('deve retornar disciplina por ID', () => {
      const disciplina: Disciplina = { id: 1, nome: 'Matemática' };

      service.buscarPorId(1).subscribe((result) => {
        expect(result).toEqual(disciplina);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      req.flush(disciplina);
    });
  });

  describe('Salvar', () => {
    it('deve fazer POST para /disciplinas', () => {
      const novaDisciplina = { nome: 'Ciências' };

      service.salvar(novaDisciplina).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novaDisciplina);
      req.flush({ id: 3, nome: 'Ciências' });
    });

    it('deve retornar disciplina criada', () => {
      const novaDisciplina = { nome: 'Ciências' };
      const disciplinaCriada: Disciplina = { id: 3, nome: 'Ciências' };

      service.salvar(novaDisciplina).subscribe((result) => {
        expect(result).toEqual(disciplinaCriada);
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush(disciplinaCriada);
    });
  });

  describe('Deletar', () => {
    it('deve fazer DELETE para /disciplinas/{id}', () => {
      const disciplinaId = 1;

      service.deletar(disciplinaId).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/${disciplinaId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
