/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NovaTransacaoService } from './nova-transacao.service';

describe('Service: NovaTransacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NovaTransacaoService]
    });
  });

  it('should ...', inject([NovaTransacaoService], (service: NovaTransacaoService) => {
    expect(service).toBeTruthy();
  }));
});
