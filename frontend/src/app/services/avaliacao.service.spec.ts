import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AvaliacaoService } from './avaliacao.service';

describe('AvaliacaoService', () => {
  let service: AvaliacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AvaliacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
