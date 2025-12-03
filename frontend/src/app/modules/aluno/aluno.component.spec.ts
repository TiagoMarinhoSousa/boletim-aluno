import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoComponent } from './aluno.component';

describe('AlunoComponent', () => {
  let component: AlunoComponent;
  let fixture: ComponentFixture<AlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunoComponent]
    });
    fixture = TestBed.createComponent(AlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
