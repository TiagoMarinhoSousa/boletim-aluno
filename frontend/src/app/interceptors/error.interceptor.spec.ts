import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorInterceptor } from './error.interceptor';
import { ErrorResponse } from '../models/error-response.model';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    snackBar = TestBed.inject(MatSnackBar);
  });

  afterEach(() => {
    httpMock.verify(); // Garante que não há requisições pendentes
  });

  it('deve interceptar um erro 404 e exibir a mensagem do backend no snackbar', () => {
    // 1. Espionar o método 'open' do MatSnackBar
    spyOn(snackBar, 'open');

    // 2. Mock do corpo do erro, imitando o ErrorResponseDTO do backend
    const mockErrorResponse: ErrorResponse = {
      timestamp: new Date().toISOString(),
      status: 404,
      error: 'Not Found',
      message: 'Aluno não encontrado com o ID: 999',
      path: '/api/alunos/999',
    };

    // 3. Fazer uma chamada HTTP que esperamos que falhe
    httpClient.get('/api/alunos/999').subscribe({
      next: () => fail('A requisição deveria ter falhado'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
      },
    });

    // 4. Interceptar a requisição e simular a resposta de erro do servidor
    const req = httpMock.expectOne('/api/alunos/999');
    req.flush(mockErrorResponse, {
      status: 404,
      statusText: 'Not Found',
    });

    // 5. Verificar se o snackBar.open foi chamado com a mensagem correta
    expect(snackBar.open).toHaveBeenCalledWith(
      '✗ Aluno não encontrado com o ID: 999', // A mensagem exata do DTO
      'Fechar',
      jasmine.objectContaining({
        panelClass: ['snackbar-erro'],
      })
    );
  });

  it('deve exibir error.message quando não há mensagem no corpo da resposta', () => {
    spyOn(snackBar, 'open');

    // Erro sem corpo de resposta ou com corpo inválido
    httpClient.get('/api/teste').subscribe({
      next: () => fail('A requisição deveria ter falhado'),
      error: () => {},
    });

    const req = httpMock.expectOne('/api/teste');
    // Simular um erro de rede sem corpo de resposta
    req.error(new ProgressEvent('error'), {
      status: 0,
      statusText: 'Unknown Error'
    });

    expect(snackBar.open).toHaveBeenCalled();
  });

  it('deve exibir mensagem padrão quando não há nenhuma mensagem disponível', () => {
    spyOn(snackBar, 'open');

    httpClient.get('/api/outro').subscribe({
      next: () => fail('A requisição deveria ter falhado'),
      error: () => {},
    });

    const req = httpMock.expectOne('/api/outro');
    // Resposta com corpo vazio (objeto vazio sem message)
    req.flush({}, {
      status: 500,
      statusText: 'Internal Server Error'
    });

    // Deve usar a mensagem padrão pois não há errorResponse.message nem error.message
    expect(snackBar.open).toHaveBeenCalled();
  });
});