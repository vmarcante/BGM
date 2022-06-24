import { NovaReceitaComponent } from './nova-receita.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: NovaReceitaComponent;
  let fixture: ComponentFixture<NovaReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaReceitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
