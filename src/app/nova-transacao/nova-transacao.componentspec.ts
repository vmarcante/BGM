import { NovaTransacaoComponent } from './nova-transacao.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: NovaTransacaoComponent;
  let fixture: ComponentFixture<NovaTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaTransacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
