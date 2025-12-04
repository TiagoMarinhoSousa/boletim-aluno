import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TurmaService } from './turma.service';

describe('TurmaService', () => {
  let service: TurmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TurmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
