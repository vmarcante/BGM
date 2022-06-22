import { ExtratoComponent } from './extrato.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ExtratoComponent', () => {
  let component: ExtratoComponent;
  let fixture: ComponentFixture<ExtratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
