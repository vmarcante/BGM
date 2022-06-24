/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TransacoesService } from './transacoes.service';

describe('Service: NovaTransacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransacoesService]
    });
  });

  it('should ...', inject([TransacoesService], (service: TransacoesService) => {
    expect(service).toBeTruthy();
  }));
});
