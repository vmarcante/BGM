import { ExtratoMesComponent } from './extrato-mes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ExtratoMesComponent', () => {
  let component: ExtratoMesComponent;
  let fixture: ComponentFixture<ExtratoMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtratoMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtratoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
