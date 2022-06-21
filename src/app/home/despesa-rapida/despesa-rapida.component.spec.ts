import { DespesaRapida } from './despesa-rapida.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: DespesaRapida;
  let fixture: ComponentFixture<DespesaRapida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespesaRapida ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespesaRapida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
