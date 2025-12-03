import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaComponent } from './nota.component';

describe('NotaComponent', () => {
  let component: NotaComponent;
  let fixture: ComponentFixture<NotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaComponent]
    });
    fixture = TestBed.createComponent(NotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
