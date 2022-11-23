import { FiltroExtratoComponent } from './filtro-extrato.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: FiltroExtratoComponent;
  let fixture: ComponentFixture<FiltroExtratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroExtratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroExtratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
