// import { Transacao } from 'src/app/models/transacao.model';
import { TransacaoMes } from './../../models/transacoesMes.model';
import { Component, OnInit } from '@angular/core';
import { TransacaoService} from '../../services/transacoes/transacao.service';
import { UtilService } from '../../services/shared/util.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  transacoesMes: TransacaoMes[] = [];
  isLoading: boolean = false;

  constructor(
    private transacaoService: TransacaoService,
    private utilService: UtilService,
  ) {
    this.utilService.updateEmitted$.subscribe(() => {
      this.getAllTransacoes();
    });
  }

  ngOnInit(): void {
    this.getAllTransacoes();
  }

  getAllTransacoes() : void {
    this.isLoading = true;
    this.transacaoService.getAllTransacoes().subscribe((res: any) => {
      this.isLoading = false;
      this.transacoesMes = res;
      this.realizarBalancoGeral();
    }, () => {
      this.isLoading = false;
    });
  }

  realizarBalancoGeral() : void {
    let saldo = 0;
    this.transacoesMes.map(x => {
      saldo += x.montanteMes;
      x.saldoFinalMes = parseFloat((Math.round(saldo * 100) / 100).toFixed(3));
    })
  }
}
