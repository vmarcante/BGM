/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TransacaoService } from './transacao.service';

describe('Service: NovaTransacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransacaoService]
    });
  });

  it('should ...', inject([TransacaoService], (service: TransacaoService) => {
    expect(service).toBeTruthy();
  }));
});
