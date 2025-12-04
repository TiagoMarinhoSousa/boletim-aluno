import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DisciplinaService } from './disciplina.service';

describe('DisciplinaService', () => {
  let service: DisciplinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DisciplinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
